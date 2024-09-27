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
    const data = await sql`select * from repo order by reposu_n desc`

    const repos:Repo[] = JSON.parse(JSON.stringify(data.rows))

    return repos;
}

/**
 * レシピ文字列検索
 */
export async function GetReposByText(str: string) {
    // 検索文字列が無いと全件表示されるので、ヒットしないような値を指定して、表示を抑止
    if(str === "") {
        str = "hoge-fuga"
    }
    const data = await sql`select * from repo where title like '%'||${str}||'%' order by reposu_n desc`

    const repos:Repo[] = JSON.parse(JSON.stringify(data.rows))

    return repos;
}

