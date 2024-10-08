import { GetAllRepos, GetReposByTitle, GetTagsByLevelAndName } from '@/app/lib/dbaccess'
import { Dispatch, SetStateAction } from 'react'

// 自前の型定義のインポート
import { Repo, DispTag } from "../model/model";

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

/**
 * タグ取得byレベル＆文字列（awaitで呼び出すための踏み台）
 */
export async function getTagsByLevelAndName(setDispTags: Dispatch<SetStateAction<DispTag[] | undefined>>, l:number, s: string) {
    const tags = await GetTagsByLevelAndName(l, s);
    // dispTagへの詰め替えが必要。　object配列の宣言と、add を調べないと

    const dispTags: DispTag[] = []
    for(const tag of tags) {
        const dispTag: DispTag = {id: tag.id, 
                                  dispname: tag.dispname, 
                                  name: tag.name, 
                                  imageuri:"", 
                                  hasimageuri:"", 
                                hasschildren:""}
        dispTags.push(dispTag)
    }
    
    setDispTags(dispTags);
}

