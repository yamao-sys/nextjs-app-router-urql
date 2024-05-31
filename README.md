# nextjs-app-router-urql
Next.jsのApp RouterでurqlのGraphQL環境を構築してみた

現状だと、urqlのキャッシュ周りがやりづらい...

Server ComponentでrequestPolicyをcache-and-networkにしても、クライアント側でキャッシュが効いてしまう

キャッシュクリアに同じ__typenameのmutationが必要である条件が地味にやりにくい

(必ずしもどのqueryも同じ__typenameのmutationを持つとは限らず...)
