// DBアクセスは async/await を使いたいから、別ファイルに切り出して、サーバーサイドで実行
'use server'

// vercel postgres 用のインポート
import { sql } from '@vercel/postgres'

// 型定義のインポート
import { Repo } from '../model/model'

/**
 * レシピ全件読み出し
 */
export async function GetAllRepos(userid: string) {
    const data = await sql`select * from repo where userid = ${userid} order by reposu_n desc`

    const repos:Repo[] = JSON.parse(JSON.stringify(data.rows))

    return repos;
}

/**
 * レシピタイトル文字列検索
 */
export async function GetReposByTitle(userid: string, str: string) {
    // 検索文字列が無いと全件表示されるので、ヒットしないような値を指定して、表示を抑止
    if(str === "") {
        str = "hoge-fuga"
    } else {
        str = "%" + str + "%"
    }
    const data = await sql`select * from repo where userid = ${userid} and title like ${str} order by reposu_n desc`

    const repos:Repo[] = JSON.parse(JSON.stringify(data.rows))

    return repos;
}

