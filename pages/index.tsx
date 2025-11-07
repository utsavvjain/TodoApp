import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import Header from "../components/UI/Header";
import TodoCard from "../components/Todo/Card/Card";
import TodoModal from "../components/Todo/Modal/Modal";
import { ITodoItem } from "../interfaces/ITodoItem";

type Props = {
  items: ITodoItem[];
};

const Home: NextPage<Props> = ({ items }: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESCRIPTION} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Welcome, login to use {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
            <div className="text-6xl">👋🏻</div>
            <h4 className="text-xl">Built with Next.js, Prisma, NextAuth.js and NextUI.</h4>
            <p>By <a target="_blank" href="https://github.com/teumaas" className="text-blue-500 hover:text-blue-700" rel="noreferrer">Tom Smits</a></p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Todos</h1>
          <TodoModal post={true} />
        </div>
        {items && items.length > 0 ? (
          <TodoCard items={items} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No todos yet. Create your first one!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return { props: { items: [] } };
  }

  const items = await prisma.item.findMany({
    where: { author: { email: session?.user?.email } },
    include: { author: { select: { name: true } } },
  });

  return { props: { items } };
};

export default Home;
