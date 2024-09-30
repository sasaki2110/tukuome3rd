'use client'

// react用インポート
import { useState , useEffect } from 'react'

// 自前の型定義インポート
import { DispTag } from "@/app/model/model";

// 自前のビジネスロジックインポート
import { getTagsByLevelAndName } from "@/app/lib/biz"

export default function Home() {
    // タグ用のステート
    const [dispTags, setDispTags] = useState<DispTag[] | undefined>(undefined)

    // 初期にタグを呼び出すエフェクト
    useEffect(() => {
        if(dispTags === undefined) {
            // 初期表示はレベル０（大タグ）。だから指定タグはブランク
            getTagsByLevelAndName(setDispTags, 0, "")
        }
    }, [dispTags])

    return (
        <div className="flex min-h-screen flex-col items-left p-2">
            <div>
                <p>これはタグ画面です</p>
            </div>
            <div className="mt-20">
                <p>これはタグ画面です</p>
            </div>

            <div className="grid grid-cols-2">
                {/* 読みだしたタグでループ 本来はdispTag型で処理しないと・・・・詰め替え方法を調べないと */}
                {dispTags && dispTags.map((dispTag: DispTag) => (
                    <div key={dispTag.id} className="p-2 m-2 border rounded-lg shadow-lg">
                        <div>
                            {dispTag.dispname}
                        </div>
                        <div>
                            {dispTag.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}