////////////////////////////////////////////////////////////////////////////////////////////////
//
// 本プロジェクトのレイアウトページ
// アプリ内のページをラップし、全体のページレイアウトをそろえる
// ナビゲーションバーもここに配置し、各ページに表示させる
//
// tanstackQueryの問題を解決するために、Providersを追加
//
////////////////////////////////////////////////////////////////////////////////////////////////
import NavBar from '@/app/components/NavBar';

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavBar/>
      <div>{children}</div>
    </div>
  )
}
