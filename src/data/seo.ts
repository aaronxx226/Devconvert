import { Tool } from './tools';

export interface SEOVariant {
  suffix: string;
  titleTemplate: (name: string) => string;
  descriptionTemplate: (name: string) => string;
  h1Template: (name: string) => string;
  introTemplate: (name: string, description: string) => string;
}

export const SEO_VARIANTS: SEOVariant[] = [
  {
    suffix: '-online',
    titleTemplate: (name) => `${name} Online - Free Developer Tool`,
    descriptionTemplate: (name) => `Use our free online ${name} tool. Fast, secure, and 100% client-side processing for developers.`,
    h1Template: (name) => `${name} Online`,
    introTemplate: (name, desc) => `Welcome to the best ${name} online utility. ${desc} This tool is designed for developers who need a quick and reliable way to handle data without leaving their browser.`
  },
  {
    suffix: '-example',
    titleTemplate: (name) => `${name} Example & Usage Guide`,
    descriptionTemplate: (name) => `See examples of how to use ${name}. Learn the best practices and common use cases for this developer tool.`,
    h1Template: (name) => `${name} Examples`,
    introTemplate: (name) => `Looking for a ${name} example? This page provides comprehensive examples and a live tool to help you understand how to use it effectively in your projects.`
  },
  {
    suffix: '-tutorial',
    titleTemplate: (name) => `${name} Tutorial - How to Use`,
    descriptionTemplate: (name) => `Step-by-step tutorial on using ${name}. Master this developer utility with our easy-to-follow guide.`,
    h1Template: (name) => `${name} Tutorial`,
    introTemplate: (name) => `In this ${name} tutorial, we'll walk you through everything you need to know about using this tool. From basic usage to advanced features, you'll be an expert in no time.`
  },
  {
    suffix: '-api-response',
    titleTemplate: (name) => `Handling API Responses with ${name}`,
    descriptionTemplate: (name) => `Learn how to process and debug API responses using ${name}. Essential for web developers working with REST APIs.`,
    h1Template: (name) => `${name} for API Responses`,
    introTemplate: (name) => `Dealing with complex API responses? ${name} is the perfect tool for inspecting, formatting, and validating data returned from your backend services.`
  }
];

export function getSEOMetadata(tool: Tool, seoSlug: string) {
  const variant = SEO_VARIANTS.find(v => seoSlug.endsWith(v.suffix));
  if (!variant) return null;

  return {
    title: variant.titleTemplate(tool.name),
    description: variant.descriptionTemplate(tool.name),
    h1: variant.h1Template(tool.name),
    intro: variant.introTemplate(tool.name, tool.description),
    variant: variant.suffix
  };
}
