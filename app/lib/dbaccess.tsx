// DBアクセスは async/await を使いたいから、別ファイルに切り出して、サーバーサイドで実行
'use server'

// vercel postgres 用のインポート
import { sql } from '@vercel/postgres'

// クエリー結果の型宣言
// レシピ型
export type Repo = {
    userid: string,
    id_n: number,
    image: string,
    title: string,
    rank: number,
    reposu_n: number,
    comment: string,
    tag: string,
    ismain: number,
    issub: number,
}

/**
 * レシピ全件読み出し
 */
export async function GetAllRepos() {
    const data = await sql`select * from repo`

    const repos:Repo[] = JSON.parse(JSON.stringify(data.rows))

    return repos;
}

