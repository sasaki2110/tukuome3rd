import { GetAllRepos, GetReposByTitle } from '@/app/lib/dbaccess'
import { Dispatch, SetStateAction } from 'react'

// 自前の型定義のインポート
import { Repo } from "../model/model";

/**
 * レシピ一覧取得（awaitで呼び出すための踏み台）
 */
export async function getAllRepos(setRepos: Dispatch<SetStateAction<Repo[] | undefined>>, u:string ) {
    const repos = await GetAllRepos(u);
    setRepos(repos);
}

/**
 * レシピ取得by文字列（awaitで呼び出すための踏み台）
 */
export async function getReposByText(setRepos: Dispatch<SetStateAction<Repo[] | undefined>>, u:string, s: string) {
    const repos = await GetReposByTitle(u, s);
    setRepos(repos);
}

