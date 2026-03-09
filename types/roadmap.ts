export interface Roadmap {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface Module {
  id: string;
  roadmap_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}
