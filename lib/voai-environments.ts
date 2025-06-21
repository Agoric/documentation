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

export interface VOAIAction {
  id: string
  label: string
  icon: string
}

export interface VOAIEnvironment {
  id: string
  name: string
  emoji: string
  description: string
  actions: string[]
}

export const VOAI_ENVIRONMENTS: VOAIEnvironment[] = [
  {
    id: "wolf",
    name: "Wolf",
    emoji: "🐺",
    description: "Unleash your inner wolf spirit.",
    actions: ["Howl at the Moon", "Hunt for Food", "Explore the Den"],
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌳",
    description: "Harness the magic of ancient woods.",
    actions: ["Commune with Trees", "Gather Mystic Herbs", "Summon Guardians"],
  },
  {
    id: "mountain",
    name: "Mountain",
    emoji: "⛰️",
    description: "Rule the lofty peaks.",
    actions: ["Survey Realm", "Forge Weapons", "Call the Eagles"],
  },
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    actions: [
      { id: "dive", label: "Dive the Depths", icon: "🤿" },
      { id: "speak-whales", label: "Speak with Whales", icon: "🐋" },
      { id: "control-tide", label: "Control Tides", icon: "🌙" },
      { id: "hunt-treasure", label: "Hunt for Treasure", icon: "💎" },
      { id: "summon-kraken", label: "Summon Kraken", icon: "🦑" },
    ],
  },
  {
    id: "cyber",
    name: "Cyber",
    emoji: "🤖",
    actions: [
      { id: "hack", label: "Hack Systems", icon: "💻" },
      { id: "mine-data", label: "Mine Data", icon: "📊" },
      { id: "merge-ai", label: "Merge with AI", icon: "🧠" },
      { id: "build-constructs", label: "Build Constructs", icon: "🏗️" },
      { id: "network-travel", label: "Network Travel", icon: "🌐" },
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
      howl: "Your powerful howl echoes across the territory, rallying your pack and asserting dominance over the land!",
      hunt: "You lead the pack on a successful hunt, bringing down prey and ensuring the survival of your family!",
      "explore-den": "You discover new territories and secure valuable resources for your pack's future!",
      "play-pack": "Bonding with your pack strengthens unity and builds trust among your loyal followers!",
      rest: "You rest peacefully, conserving energy and preparing for the challenges ahead!",
    },
    forest: {
      commune: "The ancient trees share their wisdom, revealing secrets of the forest and paths to hidden power!",
      "gather-herbs": "You collect rare mystical herbs that pulse with natural energy and healing properties!",
      "summon-guardians": "Forest guardians answer your call, ready to assist you in your woodland endeavors!",
      "control-weather": "You harness the elemental forces, bending weather patterns to your will!",
      "grove-meditate": "Deep meditation in the sacred grove restores your spiritual energy and clarity!",
    },
    mountain: {
      survey: "From your elevated position, you gain strategic insight into all territories under your command!",
      command: "Your tactical orders are executed flawlessly across the battlefield!",
      forge: "The mountain forge creates legendary weapons imbued with ancient power!",
      "call-eagles": "Sky messengers carry your commands swiftly across vast distances!",
      throne: "The throne channels the mountain's ancient power through your being!",
    },
    ocean: {
      dive: "You descend to the ocean floor, discovering ancient ruins and forgotten treasures!",
      "speak-whales": "The great leviathans share their ancient knowledge of the deep seas!",
      "control-tide": "Ocean currents bend to your will, creating powerful waves and calm seas!",
      "hunt-treasure": "You uncover valuable artifacts from sunken civilizations!",
      "summon-kraken": "The mighty Kraken rises from the depths, ready to serve your commands!",
    },
    cyber: {
      hack: "You successfully breach the digital fortress, gaining access to classified data!",
      "mine-data": "Quantum data streams reveal valuable information and hidden patterns!",
      "merge-ai": "Your consciousness expands as you merge with artificial intelligence!",
      "build-constructs": "Your digital creation materializes in the virtual space!",
      "network-travel": "You traverse the digital realm at the speed of light!",
    },
  }

  return responses[environmentId]?.[actionId] || `You successfully executed ${option.name} in the ${environment.name}!`
}
