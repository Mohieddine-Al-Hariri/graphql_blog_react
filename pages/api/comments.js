import { GraphQLClient, gql } from "graphql-request";

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
    },
  });

  const comment = await client.request(
    `mutation CreateComment($email: String!, $name: String!, $comment: String!, $slug: String!) {
      createComment(data: {email: $email, name: $name, comment: $comment, post: {connect: {slug: $slug}}}) {
        id
      }
    }`,
    {
      name: req.body.obj.name,
      email: req.body.obj.email,
      comment: req.body.obj.comment,
      slug: req.body.obj.slug,
    }
  );

  return res.status(201).json(comment);
}
