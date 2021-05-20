import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUserBasicQuery } from "../graphql/graphql";

export const checkAuth = () => {
    const { data, loading } = useCurrentUserBasicQuery();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !data?.currentUser) {
            router.replace("/user/login?next=" + router.pathname);
        }
    }, [loading, data, router]);
};

export const checkAdmin = () => {
    const { data, loading } = useCurrentUserBasicQuery();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !data?.currentUser) {
            router.replace("/user/login?next=" + router.pathname);
        } else if (!loading && !data?.currentUser.roles.includes("ADMIN")) {
            router.push("/");
        }
    }, [loading, data, router]);
};
