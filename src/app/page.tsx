"use client";

import React, {useEffect} from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function Home() {

  return (
    <div className='top-0 h-full w-full p-12 flex items-center justify-between space-x-8'>
      <div className='relative w-1/2 h-full flex justify-center flex-col items-center'>
        <div className='relative flex justify-center flex-col'>
          <div className='text-6xl font-bold'>基于<span className='text-primary'>大数据</span>分析</div>
          <div className='h-8'></div>
          <div className='text-6xl font-bold'>的大豆基因数据查询系统</div>
          <div className='h-8'></div>
          <div className='text-xl tracking-wide'>大豆基因数据库是一个<span className='text-primary'>基于大数据分析</span>的大豆基因数据查询系统，</div>
          <div className='h-2'></div>
          <div className='text-xl tracking-wide'>通过对大豆基因数据的分析，为大豆基因研究提供<span className='text-primary'>数据支持</span>。</div>
          <div className='h-16'></div>
          <div className='relative space-x-8'>
            <Button className='rounded-full h-16 w-48 text-xl shadow-lg bg-primary text-card hover:opacity-80 ransition-all duration-500' onClick={
              () => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                window.location.href = "/gene_database";
              }
            }><i className="fa-duotone fa-rocket-launch mr-2"></i> 开始使用</Button>
            <Button className='rounded-full h-16 w-48 text-xl bg-card text-text shadow-lg hover:opacity-90 ransition-all duration-500'><i className="fa-duotone fa-envelopes mr-2"></i> 联系我们</Button>
          </div>
        </div>
      </div>
      <div className='relative w-1/2 h-full flex justify-center items-center'>
        <Image alt='image' src='./image2.svg' width='800' height='800'></Image>
      </div>
    </div>
  )
}
