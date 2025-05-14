import { locales } from '@/i18n/settings';

// Course IDs for static generation
export const courseIds = ['web-development-101', 'course1', 'course2', 'course3', 'course4', 'course5'];

// Module IDs for static generation
export const moduleIds = ['1', '2', '3', '4', '5', '6', '7', '8'];

// Blog post slugs for static generation
export const blogSlugs = ['getting-started-with-web-development'];

/**
 * Generate static params for locale-only routes
 */
export function generateLocaleParams() {
  return locales.map(locale => ({ locale }));
}

/**
 * Generate static params for routes with [locale] and [slug]
 * @param {Array<string>} slugs - Array of slugs to generate params for
 */
export function generateLocaleSlugParams(slugs) {
  return locales.flatMap(locale => 
    slugs.map(slug => ({
      locale,
      slug
    }))
  );
}

/**
 * Generate static params for routes with [locale] and [id]
 * @param {Array<string>} ids - Array of IDs to generate params for
 */
export function generateLocaleIdParams(ids) {
  return locales.flatMap(locale => 
    ids.map(id => ({
      locale,
      id
    }))
  );
}

/**
 * Generate static params for routes with [locale], [id], and [moduleId]
 * @param {Array<string>} ids - Array of IDs to generate params for
 * @param {Array<string>} moduleIds - Array of module IDs to generate params for
 */
export function generateLocaleIdModuleParams(ids, moduleIds) {
  return locales.flatMap(locale => 
    ids.flatMap(id => 
      moduleIds.map(moduleId => ({
        locale,
        id,
        moduleId
      }))
    )
  );
}

// Generate static params for locale-based routes
export function generateLocaleStaticParams() {
  return locales.map(locale => ({ locale }));
}

// Generate static params for course pages
export function generateCourseStaticParams() {
  return locales.flatMap(locale => 
    courseIds.map(id => ({
      locale,
      id
    }))
  );
}

// Generate static params for course module pages
export function generateCourseModuleStaticParams() {
  return locales.flatMap(locale => 
    courseIds.flatMap(id => 
      moduleIds.map(moduleId => ({
        locale,
        id,
        moduleId
      }))
    )
  );
}

// Generate static params for blog posts
export function generateBlogStaticParams() {
  return locales.flatMap(locale => 
    blogSlugs.map(slug => ({
      locale,
      slug
    }))
  );
} 