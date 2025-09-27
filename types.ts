import React from 'react';

export interface TherapyService {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: string;
  // FIX: Use inline import for SVGProps to ensure type consistency across files.
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: (props: import('react').SVGProps<SVGSVGElement>) => React.ReactElement;
  color: string;
  duration: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export interface SerializableTherapyServiceData {
    id: string;
    color: string;
    duration: string;
    category: string;
    rating: number;
    reviewCount: number;
}

export type Language = 'en' | 'am';

// FIX: Redefined Translations to allow for arbitrarily nested translation objects.
// The previous type only allowed for one level of nesting, causing errors with `serviceData`.
export interface TranslationNode {
  [key: string]: string | TranslationNode;
}

export interface Translations {
  [key: string]: TranslationNode;
}