;/>
\
1. Inside the `EnhancedGeniusVoiceSystem\`
class **add** this helper immediately\
   after \`initializeAudioContext()`:

```ts
private async ensureAudioContext() {
  if (!this.audioContext || this.audioContext.state === "closed") {
    await this.initializeAudioContext()
  }
}
