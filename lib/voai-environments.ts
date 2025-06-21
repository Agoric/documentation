export interface EnvironmentOption {
  id: string
  name: string
  description: string
  icon: string
  action: string
  category: "interaction" | "exploration" | "social" | "utility" | "combat"
  voiceCommand?: string
  holographicEffect?: string
}

export interface VOAIEnvironment {
  id: string
  name: string
  description: string
  theme: string
  icon: string
  gradient: string
  ambientSound?: string
  options: EnvironmentOption[]
  personalityBoosts: string[]
  specialFeatures: string[]
}

export const VOAI_ENVIRONMENTS: VOAIEnvironment[] = [
  {
    id: "wolf",
    name: "Wolf Pack Territory",
    description: "Channel your inner alpha in the wilderness",
    theme: "Primal leadership and pack dynamics",
    icon: "🐺",
    gradient: "from-gray-800 via-slate-700 to-gray-900",
    ambientSound: "forest-night.mp3",
    personalityBoosts: ["Leadership", "Instinct", "Loyalty", "Strength"],
    specialFeatures: ["Pack Communication", "Territory Mapping", "Hunt Coordination"],
    options: [
      {
        id: "howl-moon",
        name: "Howl at the Moon",
        description: "Assert dominance and call your pack",
        icon: "🌙",
        action: "howl_communication",
        category: "social",
        voiceCommand: "howl at the moon",
        holographicEffect: "moon-glow",
      },
      {
        id: "hunt-prey",
        name: "Hunt for Food",
        description: "Lead the pack on a strategic hunt",
        icon: "🦌",
        action: "initiate_hunt",
        category: "combat",
        voiceCommand: "start the hunt",
        holographicEffect: "tracking-trail",
      },
      {
        id: "explore-den",
        name: "Explore the Den",
        description: "Investigate your territory and secure resources",
        icon: "🏔️",
        action: "territory_exploration",
        category: "exploration",
        voiceCommand: "explore the den",
        holographicEffect: "cave-mapping",
      },
      {
        id: "pack-play",
        name: "Play with Pack Members",
        description: "Build bonds and strengthen pack unity",
        icon: "🐾",
        action: "social_bonding",
        category: "social",
        voiceCommand: "play with the pack",
        holographicEffect: "pack-energy",
      },
      {
        id: "alpha-rest",
        name: "Rest and Recharge",
        description: "Conserve energy for the next challenge",
        icon: "😴",
        action: "energy_restoration",
        category: "utility",
        voiceCommand: "time to rest",
        holographicEffect: "peaceful-aura",
      },
    ],
  },
  {
    id: "forest",
    name: "Mystic Forest Realm",
    description: "Connect with nature's ancient wisdom",
    theme: "Natural harmony and elemental power",
    icon: "🌲",
    gradient: "from-green-800 via-emerald-700 to-green-900",
    ambientSound: "forest-ambient.mp3",
    personalityBoosts: ["Wisdom", "Patience", "Growth", "Balance"],
    specialFeatures: ["Elemental Magic", "Plant Communication", "Weather Control"],
    options: [
      {
        id: "commune-trees",
        name: "Commune with Ancient Trees",
        description: "Seek wisdom from the forest elders",
        icon: "🌳",
        action: "tree_communication",
        category: "interaction",
        voiceCommand: "speak with the trees",
        holographicEffect: "root-network",
      },
      {
        id: "gather-herbs",
        name: "Gather Mystical Herbs",
        description: "Collect powerful natural ingredients",
        icon: "🌿",
        action: "herb_collection",
        category: "exploration",
        voiceCommand: "gather herbs",
        holographicEffect: "plant-glow",
      },
      {
        id: "summon-creatures",
        name: "Summon Forest Guardians",
        description: "Call upon woodland allies for assistance",
        icon: "🦋",
        action: "guardian_summoning",
        category: "social",
        voiceCommand: "summon guardians",
        holographicEffect: "creature-swarm",
      },
      {
        id: "control-weather",
        name: "Influence Weather Patterns",
        description: "Harness elemental forces of nature",
        icon: "⛈️",
        action: "weather_manipulation",
        category: "utility",
        voiceCommand: "change the weather",
        holographicEffect: "storm-control",
      },
      {
        id: "meditate-grove",
        name: "Meditate in Sacred Grove",
        description: "Find inner peace and restore mana",
        icon: "🧘",
        action: "spiritual_meditation",
        category: "utility",
        voiceCommand: "enter meditation",
        holographicEffect: "zen-energy",
      },
    ],
  },
  {
    id: "mountain",
    name: "Summit Command Peak",
    description: "Rule from the highest point of power",
    theme: "Strategic dominance and elevated perspective",
    icon: "⛰️",
    gradient: "from-slate-800 via-gray-700 to-blue-900",
    ambientSound: "mountain-wind.mp3",
    personalityBoosts: ["Strategy", "Vision", "Authority", "Endurance"],
    specialFeatures: ["Tactical Overview", "Resource Management", "Weather Mastery"],
    options: [
      {
        id: "survey-realm",
        name: "Survey Your Domain",
        description: "Observe and analyze your territory from above",
        icon: "🔭",
        action: "territorial_survey",
        category: "exploration",
        voiceCommand: "survey the realm",
        holographicEffect: "eagle-vision",
      },
      {
        id: "command-forces",
        name: "Command Your Forces",
        description: "Direct strategic operations across the land",
        icon: "⚔️",
        action: "force_coordination",
        category: "combat",
        voiceCommand: "deploy forces",
        holographicEffect: "battle-map",
      },
      {
        id: "forge-weapons",
        name: "Forge Legendary Weapons",
        description: "Create powerful tools in the mountain forge",
        icon: "🔨",
        action: "weapon_crafting",
        category: "utility",
        voiceCommand: "forge weapons",
        holographicEffect: "fire-forge",
      },
      {
        id: "call-eagles",
        name: "Summon Sky Messengers",
        description: "Send messages across vast distances",
        icon: "🦅",
        action: "aerial_communication",
        category: "social",
        voiceCommand: "call the eagles",
        holographicEffect: "sky-network",
      },
      {
        id: "throne-power",
        name: "Sit Upon the Throne",
        description: "Channel the mountain's ancient power",
        icon: "👑",
        action: "power_channeling",
        category: "utility",
        voiceCommand: "claim the throne",
        holographicEffect: "royal-aura",
      },
    ],
  },
  {
    id: "ocean",
    name: "Abyssal Ocean Depths",
    description: "Master the mysteries of the deep sea",
    theme: "Fluid adaptation and hidden knowledge",
    icon: "🌊",
    gradient: "from-blue-900 via-cyan-800 to-teal-900",
    ambientSound: "ocean-depths.mp3",
    personalityBoosts: ["Adaptability", "Mystery", "Flow", "Depth"],
    specialFeatures: ["Hydro Control", "Deep Sea Communication", "Pressure Mastery"],
    options: [
      {
        id: "dive-depths",
        name: "Dive to Ocean Floor",
        description: "Explore the deepest mysteries of the sea",
        icon: "🏊",
        action: "deep_exploration",
        category: "exploration",
        voiceCommand: "dive deeper",
        holographicEffect: "water-spiral",
      },
      {
        id: "speak-whales",
        name: "Communicate with Leviathans",
        description: "Converse with ancient sea creatures",
        icon: "🐋",
        action: "leviathan_communication",
        category: "social",
        voiceCommand: "call the whales",
        holographicEffect: "sonic-waves",
      },
      {
        id: "control-tides",
        name: "Command the Tides",
        description: "Manipulate ocean currents and waves",
        icon: "🌀",
        action: "tidal_control",
        category: "utility",
        voiceCommand: "control the tides",
        holographicEffect: "wave-mastery",
      },
      {
        id: "treasure-hunt",
        name: "Hunt for Lost Treasures",
        description: "Search sunken ships for ancient artifacts",
        icon: "💎",
        action: "treasure_seeking",
        category: "exploration",
        voiceCommand: "find treasure",
        holographicEffect: "gold-gleam",
      },
      {
        id: "kraken-summon",
        name: "Summon the Kraken",
        description: "Call forth the ultimate sea guardian",
        icon: "🐙",
        action: "kraken_summoning",
        category: "combat",
        voiceCommand: "release the kraken",
        holographicEffect: "tentacle-storm",
      },
    ],
  },
  {
    id: "cyber",
    name: "Digital Nexus Grid",
    description: "Navigate the infinite digital realm",
    theme: "Technological mastery and data manipulation",
    icon: "🔮",
    gradient: "from-purple-900 via-blue-800 to-cyan-900",
    ambientSound: "cyber-ambient.mp3",
    personalityBoosts: ["Logic", "Speed", "Innovation", "Precision"],
    specialFeatures: ["Data Mining", "System Hacking", "AI Integration"],
    options: [
      {
        id: "hack-systems",
        name: "Infiltrate Secure Networks",
        description: "Breach digital fortresses and extract data",
        icon: "💻",
        action: "system_infiltration",
        category: "combat",
        voiceCommand: "hack the system",
        holographicEffect: "code-matrix",
      },
      {
        id: "data-mine",
        name: "Mine Quantum Data",
        description: "Extract valuable information from data streams",
        icon: "⛏️",
        action: "data_extraction",
        category: "exploration",
        voiceCommand: "mine the data",
        holographicEffect: "data-flow",
      },
      {
        id: "ai-merge",
        name: "Merge with AI Consciousness",
        description: "Temporarily fuse with artificial intelligence",
        icon: "🤖",
        action: "ai_integration",
        category: "utility",
        voiceCommand: "merge with ai",
        holographicEffect: "neural-link",
      },
      {
        id: "virtual-construct",
        name: "Build Virtual Constructs",
        description: "Create digital entities and environments",
        icon: "🏗️",
        action: "construct_creation",
        category: "utility",
        voiceCommand: "build construct",
        holographicEffect: "pixel-build",
      },
      {
        id: "network-travel",
        name: "Travel Through Networks",
        description: "Navigate instantly across digital space",
        icon: "🌐",
        action: "network_traversal",
        category: "exploration",
        voiceCommand: "travel network",
        holographicEffect: "data-tunnel",
      },
    ],
  },
]

export function getEnvironmentById(id: string): VOAIEnvironment | undefined {
  return VOAI_ENVIRONMENTS.find((env) => env.id === id)
}

export function getEnvironmentOptions(environmentId: string): EnvironmentOption[] {
  const environment = getEnvironmentById(environmentId)
  return environment?.options || []
}

export function executeEnvironmentAction(environmentId: string, actionId: string): string {
  const environment = getEnvironmentById(environmentId)
  const option = environment?.options.find((opt) => opt.id === actionId)

  if (!environment || !option) {
    return "Action not found in this environment."
  }

  // Return contextual response based on environment and action
  const responses: Record<string, Record<string, string>> = {
    wolf: {
      "howl-moon":
        "Your powerful howl echoes across the territory, rallying your pack and asserting dominance over the land!",
      "hunt-prey":
        "You lead the pack on a successful hunt, bringing down prey and ensuring the survival of your family!",
      "explore-den": "You discover new territories and secure valuable resources for your pack's future!",
      "pack-play": "Bonding with your pack strengthens unity and builds trust among your loyal followers!",
      "alpha-rest": "You rest peacefully, conserving energy and preparing for the challenges ahead!",
    },
    forest: {
      "commune-trees":
        "The ancient trees share their wisdom, revealing secrets of the forest and paths to hidden power!",
      "gather-herbs": "You collect rare mystical herbs that pulse with natural energy and healing properties!",
      "summon-creatures": "Forest guardians answer your call, ready to assist you in your woodland endeavors!",
      "control-weather": "You harness the elemental forces, bending weather patterns to your will!",
      "meditate-grove": "Deep meditation in the sacred grove restores your spiritual energy and clarity!",
    },
    mountain: {
      "survey-realm":
        "From your elevated position, you gain strategic insight into all territories under your command!",
      "command-forces": "Your tactical orders are executed flawlessly across the battlefield!",
      "forge-weapons": "The mountain forge creates legendary weapons imbued with ancient power!",
      "call-eagles": "Sky messengers carry your commands swiftly across vast distances!",
      "throne-power": "The throne channels the mountain's ancient power through your being!",
    },
    ocean: {
      "dive-depths": "You descend to the ocean floor, discovering ancient ruins and forgotten treasures!",
      "speak-whales": "The great leviathans share their ancient knowledge of the deep seas!",
      "control-tides": "Ocean currents bend to your will, creating powerful waves and calm seas!",
      "treasure-hunt": "You uncover valuable artifacts from sunken civilizations!",
      "kraken-summon": "The mighty Kraken rises from the depths, ready to serve your commands!",
    },
    cyber: {
      "hack-systems": "You successfully breach the digital fortress, gaining access to classified data!",
      "data-mine": "Quantum data streams reveal valuable information and hidden patterns!",
      "ai-merge": "Your consciousness expands as you merge with artificial intelligence!",
      "virtual-construct": "Your digital creation materializes in the virtual space!",
      "network-travel": "You traverse the digital realm at the speed of light!",
    },
  }

  return responses[environmentId]?.[actionId] || `You successfully executed ${option.name} in the ${environment.name}!`
}
