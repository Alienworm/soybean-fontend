import { DataTable } from './components/data-table'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import dynamic from "next/dynamic";

// @ts-ignore
const NeoGraph = dynamic(() => import("@/app/gene_database/components/neo4j"), {  ssr: false });

// import { NeoGraph } from "@/app/gene_database/components/neo4j";


export default async function GeneDatabase() {

  return (
    <div className='relative z-0 top-[0] min-h-[calc(100vh-4rem)] w-screen p-12 space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>大豆植株基因信息</CardTitle>
          <CardDescription>大豆植株基因信息查找工具，按照Cheom、Pos、GeneType、Soybean Name查找</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={[]} data={[]}/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>大豆植株基因图谱</CardTitle>
          <CardDescription>大豆植株基因图谱分析工具，</CardDescription>
          <CardDescription>
            输入格式：植株名1,基因类型(alt,ref或者为空),gene(固定为gene),基因类型(alt,ref或者为空),植株名2。
            <div className="font-bold text-primary">分隔符为英文逗号&quot;,&quot;</div>
          </CardDescription>
          <CardDescription>示例：{"S140_609,alt,gene,ref,S140_613_HCJWYCCXY_L6"}</CardDescription>
          <CardDescription>示例：{"S140_609,alt,gene,ref,S140_613_HCJWYCCXY_L6,alt,gene,ref,S140_612_HCJWYCCXY_L6"}</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-[54rem]">
          <NeoGraph
            neo4jUrl="bolt://172.18.76.62:7687"
            neo4jAccount="neo4j"
            neo4jPassword="neo4j"
            // @ts-ignore
            labels={["soybean", "gene"]}
            relationships={["ref", "alt"]}
          ></NeoGraph>
        </CardContent>
      </Card>
    </div>
  )
}
