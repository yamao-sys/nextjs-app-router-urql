# reading-record
読書記録アプリ

## frontendのGraphQLライブラリ
https://zenn.dev/sora_kumo/articles/661e1abc1cda67

## GraphQLライブラリの選定の過程
- https://zenn.dev/waddy/books/graphql-nestjs-nextjs-bootcamp/viewer/nextjs
	- CSRで使うことも考慮されていると助かる
		- クライアントサイドからRefetchでリクエストすることを前提としていそう
		- → RSCでClientからのリクエストでもServer Actionsで処理はサーバが担えるはず
	- SSRで使う分にはあまりキャッシュ戦略は考えずに済む方が良い

- GraphQLクライアントに求めること
	- サーバとの通信

- Apollo Clientは状態管理ライブラリ(https://user-first.ikyu.co.jp/entry/2022/07/01/121325)
	- 価値を発揮するプロダクトの性質...Mutationが頻繁に発生し、かつMutation実行後にRefetchができない性質のもの
		- 例) XやInstagramなどのSNS
		- 無限スクロールのようなUI
		- 特定のアイテムを更新する場合、それ以外のアイテムはRefetchするのではなくキャッシュ(正規化されたキャッシュ)を使う
	- Mutationがほとんど発生しないようなアプリケーションやMutation後にデータの再取得によってUIの更新をすることが許されるようなアプリケーションではApollo Clientはオーバースペック
	- 状態管理でも専門のライブラリ(ContextやRecoilなど)と比べるとインターフェースがこなれておらず
	- キャッシュに関して
		- https://zenn.dev/buyselltech/articles/b64935ea7d6fee
	- 今回の場合は少しオーバースペックかな...？いや、でも状態管理はするし、一部の更新mutationは実行するだろうからな。
	- キャッシュ管理が大変らしい
- urql
	- Document Cache(https://zenn.dev/adwd/articles/f4c5c5120467bb)
		- Queryとvariablesをhash化したもの
			- 同じQueryを同じvariablesで実行した場合はキャッシュを返す
		- Mutation実行後、__typenameが同一のものがあれば、同一のQueryでデータを再取得する
			- Apolloで正規化されたキャッシュ(__typename + id)と比べると思い切りがある
		- Mutation実行後にMutationの戻り値と同じ__typenameを持つQueryを全て再取得する
		- Apolloなどと比べると多少キャッシュ効率は落ちるものの、シンプルなのでわかりやすい
			- Apolloでキャッシュいじるよりも、Refetchで再取得した方がシンプル！
		- キャッシュ効率が求められる段階になったらApolloを検討するとかもあり
	- useQueryといったhooksベースで使いやすい

- swr + graphql-request
	- 状態管理機能を持たない

- urql code generator
	-	https://qiita.com/mu-suke08/items/e253d60de9aacaf95bef

### SSRと非同期データ取得の煩わしさ
- SSRは非同期データ取得に非対応(データ取得はHTML生成時に同期的なデータ取得)
- GraphQLでHTML初期生成時とクライアントサイドからのRefetchの混在(別々にコードを書く必要がある)

→ RSCの登場でできるように

- GraphQLクライアントライブラリの選定
	- Next.jsのfetch API
	- Apollo Client
	- urql
- キャッシュ戦略をあまり考えなくても済むものが良い
- スキーマからAPIクライアント・型の生成を自動で行いたい
	- graphql-code-generator
