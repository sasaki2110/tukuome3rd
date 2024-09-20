'use client'

import Image from "next/image";

import { useState , useEffect, Dispatch, SetStateAction } from 'react'

import { Repo, GetAllRepos } from '@/app/lib/dbaccess'

/**
 * レシピ一覧取得（awaitで呼び出すための踏み台）
 * ここは別に待ち合わせ出来ないから、promiseでも良い。
 */
async function getAllRepos(setRepos: Dispatch<SetStateAction<Repo[] | undefined>>) {
    const repos = await GetAllRepos();
    setRepos(repos);
}

export default function Home() {
    // レシピ用のステート
    const [repos, setRepos] = useState<Repo[] | undefined>(undefined)

    // 初期にレシピを呼び出すエフェクト
    useEffect(() => {
        if(repos === undefined) {
            getAllRepos(setRepos);
        }
    }, [repos])

    return (
        <div className="flex min-h-screen flex-col items-left p-24 ">
            <div className='w-4/5'>
                <h2>探す</h2>
            </div>
            {repos && repos.map((repo) => (
                <div>
                <a>
                <Image
                    src={repo.image}
                    alt=""
                    width={20}
                    height={20}
                />
                </a>

                    <p>{repo.title}</p>
                </div>
            ))}
        </div>
    )
}