'use client'

// next用インポート
import Image from "next/image";

// react用インポート
import { useState , useEffect, Dispatch, SetStateAction } from 'react'
import { useRouter } from "next/navigation"

// 自前のDBACCESS用インポート
import { Repo, GetAllRepos, GetReposByText } from '@/app/lib/dbaccess'

// アイコンフォント用インポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

import { faStar as faStarReg} from "@fortawesome/free-regular-svg-icons";
//import { faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons";

import { faComment as faCommentReg} from "@fortawesome/free-regular-svg-icons";
import { faComment as faCommentSolid} from "@fortawesome/free-solid-svg-icons";

import { faCheck as faCheckSolid } from "@fortawesome/free-solid-svg-icons";

// ステート用インポート
import { useRecoilState } from "recoil";
import { useridState, searchModeState, searchValueState } from "../atom/myatom";

/**
 * レシピ一覧取得（awaitで呼び出すための踏み台）
 */
async function getAllRepos(setRepos: Dispatch<SetStateAction<Repo[] | undefined>>) {
    const repos = await GetAllRepos();
    setRepos(repos);
}

/**
 * レシピ取得by文字列（awaitで呼び出すための踏み台）
 */
async function getReposByText(setRepos: Dispatch<SetStateAction<Repo[] | undefined>>, s: string) {
    const repos = await GetReposByText(s);
    setRepos(repos);
}

export default function Home() {
    // レシピ用のステート
    const [repos, setRepos] = useState<Repo[] | undefined>(undefined)

    // 画面遷移用のルーター
    const router = useRouter();

    // ステート取得
    const [userid, ] = useRecoilState(useridState);
    const [searchMode, setSearchMode] = useRecoilState(searchModeState)
    const [searchValue, setSearchValue] = useRecoilState(searchValueState)

    console.log("userid = [" + userid + "] searchMode = [" + searchMode + "] + searchValue = [" + searchValue + "]")

    // イベントハンドラ関数 textのonChange
    const handleOnChange = (e: any) => {
        // 本来のイベントハンドラ呼び出し
        e.preventDefault()

        // 画面を再描画する為に、レシピ一覧をクリア
        setRepos(undefined)

        // 検索条件を設定
        setSearchMode("text")
        setSearchValue(e.target.value)

        // 探す画面（自分自身）を呼び出し
        router.push("/search")

        return false
    }

    // 初期にレシピを呼び出すエフェクト
    useEffect(() => {
        if(repos === undefined) {
            if(searchMode === "all") {
                getAllRepos(setRepos)
            }
            if(searchMode === "text") {
                getReposByText(setRepos, searchValue)
            }
        }
    }, [repos])

    return (
        <div className="flex min-h-screen flex-col items-left p-2">
            <div className='w-4/5 mt-20 px-2 mx-2'>
                <h2>探す</h2>
            </div>
            <div>
                <input
                    className="border w-4/5 px-2 mx-2"
                    id="sInput"
                    placeholder={"検索文字列を入力してください"}
                    type={"text"}
                    onChange={handleOnChange}
                />                
            </div>

            <div className="grid grid-cols-2">
                {/* 読みだしたレシピでループ */}
                {repos && repos.map((repo: Repo) => (
                    <div key={repo.id_n} className="p-2 m-2 border rounded-lg shadow-lg">
                        <div>
                            {/* イメージ 兼 cookpadへのリンク */}
                            <a href={"https://cookpad.com/jp/recipes/" + repo.id_n} target="_blank">
                            <Image
                                className="object-cover h-48 w-full rounded-lg"
                                src={repo.image}
                                alt=""
                                height={200}
                                width={200}
                            />
                            </a>
                        </div>
                        <div>
                            {/* タイトル表示 */}
                            {repo.title}                            
                        </div>
                        <div>
                            {/* つくれぽ数表示 */}
                            {repo.reposu_n.toLocaleString() + " 件"}
                        </div>

                        {/* 操作アイコンエリア */}
                        <div className="grid grid-cols-4 mt-2">
                            {/* ハート（いいね） */}
                            <div className="text-center">
                                {repo.rank === 0 ? (
                                    <FontAwesomeIcon icon={faHeartReg} className="h-[20px]"/>
                                ) : (
                                    <FontAwesomeIcon icon={faHeartSolid} className="h-[20px]" color="red"/>
                                )}
                            </div>

                            {/* 既読（チェック） */}
                            <div className="text-center">
                                {repo.ismain === 9 ? (
                                    <FontAwesomeIcon icon={faCheckSolid} className="h-[20px]"/>
                                ) : (
                                    <FontAwesomeIcon icon={faCheckSolid} className="h-[20px]" color="gray"/>
                                )}
                            </div>

                            {/* フォルダ（星） */}
                            <div className="text-center">
                                <FontAwesomeIcon icon={faStarReg} className="h-[20px]" color="orange"/>
                            </div>

                            {/* コメント */}
                            <div className="text-center">
                                {repo.comment === "" ? (
                                    <FontAwesomeIcon icon={faCommentReg} className="h-[20px]"/>
                                ) : (
                                    <FontAwesomeIcon icon={faCommentSolid} className="h-[20px]"/>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}