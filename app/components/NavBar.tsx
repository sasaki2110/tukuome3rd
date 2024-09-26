////////////////////////////////////////////////////////////////////////////////////////////////
//
// ナビゲーションバー
//
// こっちの方がしっくりくる。こっちの前提で進める。
// 課題は位置の固定（fixedにすると、横にずれてしまう。）
//
////////////////////////////////////////////////////////////////////////////////////////////////
"use client";
import React, { useState } from 'react';
import Link from "next/link"
import Image from "next/image"

/**
 * ナビゲーションバー
 * @returns ナビゲーションバーコンポーネント
 */
export default function NavBar() {
  // スマホ画面でのハンバーガーメニューオープン状態
  const [isOpen, setIsOpen] = useState(false);
  
  return (
      <div className="fixed w-screen z-10 px-1 md:px-20 text-blue-navbar bg-white">
        <div className="flex justify-between items-center">
          <div>
            <Link className="" href="/">
              <Image src="/logo.png" width={70} height={70} alt="Tukuome 3rd" />
            </Link>
          </div>
          <div>
            <button className="md:hidden" onClick={()=> {setIsOpen(!isOpen)}}>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
              </svg>    
            </button>
          </div>
          <div className="hidden md:block ">
            <ul className="flex flex-col md:flex-row justify-center md:justify-end items-end">
              <Link href="/detail" className="block px-2 py-2 text-center">タグ検索</Link>
              <Link href="#" className="block px-2 py-2 text-center">フォルダ</Link>
              <Link href="#" className="block px-2 py-2 text-center">作者一覧</Link>
            </ul>
          </div>
        </div>
        <div className={isOpen?"block":"hidden"}>
          <ul className="flex flex-col md:flex-row justify-center md:justify-end items-center">
            <Link href="/detail" onClick={()=> {setIsOpen(!isOpen)}} className="block px-2 py-2 text-center">タグ検索</Link>
            <Link href="#" onClick={()=> {setIsOpen(!isOpen)}} className="block px-2 py-2 text-center">フォルダ</Link>
            <Link href="#" onClick={()=> {setIsOpen(!isOpen)}} className="block px-2 py-2 text-center">作者一覧</Link>
          </ul>
        </div>
      </div>
  )
}