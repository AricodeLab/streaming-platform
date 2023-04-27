import { useEffect,useContext } from "react";
import Layout from "../../components/layout";
import { AuthContext } from "../../context/AuthContext";
import VideoPlay from "../../components/videoPlayer";
import {recoverUserInfo} from "../../service/api"
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export  default function Web() {
  
  return (
    <Layout>
      <div className="flex flex-col text-white w-full h-full items-center">
        <VideoPlay id={1} title="title" streaming_url="https://raw.githubusercontent.com/Alextremo123/lista-m3u/main/ALEX"/>
      </div>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const cokkies  = parseCookies(ctx)
  const { ['Authentication']: token } = cokkies
  if (!token) {
   
    return {
      redirect: {
        destination: `/?message=${encodeURIComponent("Hace Login para acessar servicios")}`,
        permanent: false,
      },
    }
  }

  try{
    const info = await recoverUserInfo(cokkies)
  } catch(e){
    console.log(e)
    return {
      redirect: {
        destination: `/?message=${encodeURIComponent(e.response?.data?.message|| "error")}`,
        permanent: false,
      },
    }
  }
  


  return {
    props: {}
  }
}