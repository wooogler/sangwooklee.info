import type { GatsbyNode } from 'gatsby';

// Gatsby infers the GraphQL schema from the frontmatter that actually exists in
// `contents/`, so an optional field disappears from the schema the moment no
// entry uses it — and every page query referencing it fails the build. These
// fields are genuinely optional (a badge here, an award there), so declare them
// explicitly. Non-listed frontmatter fields are still inferred as usual.
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    actions.createTypes(`
      type MdxFrontmatter {
        under_review: Boolean
        review_status: String
        award: String
        demo_label: String
      }
    `);
  };
