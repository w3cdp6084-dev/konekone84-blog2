import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPosts() {
  const response = await notion.databases.query({ 
    database_id: process.env.NOTION_DATABASE_ID 
  });
  // データベースからのレスポンスを処理
  return response.results;
}