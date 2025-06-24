#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const glob = require("glob")

// Common regex patterns that often cause issues
const problematicPatterns = [
  /\/[^/]*$/, // Regex missing closing slash
  /new RegExp\('[^']*'[^,)]/, // RegExp constructor without flags
  /\/.*\/[gimuy]*[^gimuy\s;,)\]}]/, // Invalid regex flags
]

function validateRegexInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const lines = content.split("\n")
  const issues = []

  lines.forEach((line, index) => {
    // Check for common regex issues
    if (line.includes("new RegExp(") || line.match(/\/.*\//)) {
      try {
        // Extract potential regex patterns
        const regexMatches = line.match(/\/[^/\n]*\/[gimuy]*/g)
        if (regexMatches) {
          regexMatches.forEach((match) => {
            try {
              new RegExp(match.slice(1, match.lastIndexOf("/")), match.slice(match.lastIndexOf("/") + 1))
            } catch (error) {
              issues.push({
                file: filePath,
                line: index + 1,
                issue: `Invalid regex: ${match}`,
                error: error.message,
              })
            }
          })
        }
      } catch (error) {
        // Ignore parsing errors for now
      }
    }
  })

  return issues
}

function main() {
  const files = glob.sync("**/*.{ts,tsx,js,jsx}", {
    ignore: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  })

  let totalIssues = 0

  files.forEach((file) => {
    const issues = validateRegexInFile(file)
    if (issues.length > 0) {
      console.log(`\n📁 ${file}:`)
      issues.forEach((issue) => {
        console.log(`  ❌ Line ${issue.line}: ${issue.issue}`)
        console.log(`     Error: ${issue.error}`)
        totalIssues++
      })
    }
  })

  if (totalIssues === 0) {
    console.log("✅ No regex issues found!")
  } else {
    console.log(`\n❌ Found ${totalIssues} regex issues that need to be fixed.`)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { validateRegexInFile }
