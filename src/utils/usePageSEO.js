import { useEffect } from 'react'

/**
 * Custom hook to dynamically update document title and meta description
 * as the user navigates between views in GradeCompass.
 *
 * @param {Object} options
 * @param {string} options.title - Document title
 * @param {string} options.description - Meta description content
 */
export function usePageSEO({ title, description }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title
    }

    // 2. Helper to set or update meta tag content
    const setMetaTag = (selector, attribute, attributeValue, content) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 3. Update Standard Meta Description
    if (description) {
      setMetaTag('meta[name="description"]', 'name', 'description', description)
      setMetaTag('meta[name="title"]', 'name', 'title', title)
      setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
      setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
      setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    }
  }, [title, description])
}

