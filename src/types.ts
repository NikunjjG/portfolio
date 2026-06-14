export interface FormField {
  label: string;
  type: 'text' | 'number' | 'range' | 'select' | 'checkbox' | 'radio' | 'textarea';
  placeholder?: string;
  options?: string[];
  min?: number;
  max?: number;
  value?: any;
}

export interface FormConfig {
  type: 'form';
  title?: string;
  fields: FormField[];
}

export interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'system' | 'error';
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  narrative: string;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  bannerUrl: string;
}

export interface SkillItem {
  name: string;
  category: 'core' | 'infra' | 'lifestyle';
  description: string;
  icon: string;
  colorClass: string;
}
