'use client'

import Image from "next/image";

import { useState , useEffect, Dispatch, SetStateAction } from 'react'

import { Repo, GetAllRepos } from '@/app/lib/dbaccess'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
        <div className="flex min-h-screen flex-col items-left p-8">
            <div className='w-4/5'>
                <h2>探す</h2>
            </div>
            <div className="grid grid-cols-2">
                {repos && repos.map((repo) => (
                    <div key={repo.id_n} className="p-2 m-2 border rounded shadow-lg">
                        <div>
                            <a>
                            <Image
                                src={repo.image}
                                alt=""
                                height={200}
                                width={200}
                            />
                            </a>
                        </div>
                        <div>
                            {repo.title}                            
                        </div>
                        <div>
                            {repo.reposu_n.toLocaleString() + " 件"}
                        </div>
                        <div className="grid grid-cols-4 m-2">
                            <div className="text-center">
                                <FontAwesomeIcon icon={faHeart} className="h-[20px]" color="red"/>
                            </div>
                            <div className="text-center">
                                <FontAwesomeIcon icon={faCheck} className="h-[20px]"/>
                            </div>
                            <div className="text-center">
                                <FontAwesomeIcon icon={faStar} className="h-[20px]" color="orange"/>
                            </div>
                            <div className="text-center">
                                <FontAwesomeIcon icon={faComment} className="h-[20px]"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}