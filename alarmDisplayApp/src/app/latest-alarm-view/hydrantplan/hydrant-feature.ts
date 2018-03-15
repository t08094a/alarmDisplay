export interface HydrantFeature {
  id: number;
  type: string;
  lat: number;
  lon: number;
  tags: HydrantTags;
}

export interface HydrantTags {
  emergency: string;
  diameter: number;
  position: string;
  type: string;
  ref: string;
}
