import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUserQuery } from "../graphql/graphql";

export const checkAuth = () => {
    const { data, loading } = useCurrentUserQuery();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !data?.currentUser) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [loading, data, router]);
};

export const checkAdmin = () => {
    const { data, loading } = useCurrentUserQuery();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !data?.currentUser.isAdmin) {
            router.push("/");
        }
    }, [loading, data, router]);
};
