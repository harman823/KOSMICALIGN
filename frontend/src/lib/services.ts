export const FALLBACK_SERVICES = [
  {
    id: "razorpay-test",
    slug: "razorpay-test",
    title: "Razorpay Test Transaction",
    description: "A one-rupee test booking for verifying the complete Razorpay payment and confirmation flow.",
    durationMin: 15,
    price: 1,
    sessionMode: "ONLINE",
  },
  {
    id: "clarity-call",
    slug: "clarity-call",
    title: "Clarity Call",
    description: "A focused one-on-one conversation to untangle what feels unclear, identify the next helpful step, and leave with a calmer sense of direction.",
    imageUrl: "/img/services/clarity-call.png",
    durationMin: 30,
    price: 99,
    sessionMode: "ONLINE",
  },
  {
    id: "individual-therapy",
    slug: "individual-therapy",
    title: "Individual Therapy Sessions",
    description: "One-on-one customised therapy sessions for personal healing, emotional clarity, and alignment of mind, body, and spirit.",
    durationMin: 90,
    price: 3111,
    sessionMode: "ONLINE",
  },
  {
    id: "adolescence-counselling",
    slug: "adolescence-counselling",
    title: "Adolescence Counselling",
    description: "A safe, structured space for adolescents to process emotions, life changes, identity questions, and relationship challenges.",
    durationMin: 90,
    price: 3100,
    sessionMode: "ONLINE",
  },
  {
    id: "emotional-counselling",
    slug: "emotional-counselling",
    title: "Emotional Counselling",
    description: "Compassionate support for understanding, processing, and healing difficult emotions with culture-sensitive therapeutic tools.",
    durationMin: 90,
    price: 3100,
    sessionMode: "ONLINE",
  },
  {
    id: "relationship-counselling",
    slug: "relationship-counselling",
    title: "Relationship Counselling",
    description: "Guidance for communication, attachment patterns, narcissistic abuse healing and healthier connections.",
    durationMin: 90,
    price: 3100,
    sessionMode: "ONLINE",
  },
  {
    id: "repetitive-patterns",
    slug: "repetitive-patterns",
    title: "Issues Related to Repetitive Patterns in Life",
    description: "Identify hidden and visible life patterns, connect missing links, and begin resolving cycles that keep repeating.",
    durationMin: 90,
    price: 3100,
    sessionMode: "ONLINE",
  },
  {
    id: "stuck-in-life",
    slug: "stuck-in-life",
    title: "Feeling \"Stuck in Life\"",
    description: "Therapeutic guidance for moments when life feels stagnant, unclear, or disconnected from your deeper sense of direction.",
    durationMin: 90,
    price: 3100,
    sessionMode: "ONLINE",
  },
  {
    id: "intergenerational-trauma-therapy",
    slug: "intergenerational-trauma-therapy",
    title: "Intergenerational Trauma Therapy",
    description: "Deep structured work around inherited trauma, ancestral patterns, family imprints, and the source of origin of core issues.",
    durationMin: 90,
    price: 51000,
    sessionMode: "ONLINE",
  },
];

export const normalizeServicesResponse = (response: any) => {
  const services = response?.data || response;
  return Array.isArray(services) && services.length > 0 ? services : FALLBACK_SERVICES;
};

export const getServicePriceUnit = (title: string) =>
  title === "Intergenerational Trauma Therapy" ? "per head" : "per session";
