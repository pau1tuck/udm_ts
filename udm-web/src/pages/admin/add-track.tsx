import React from "react";
import { ICreateTrack } from "../../types/track.types";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormControl,
    Heading,
    Input,
    InputGroup,
    Select,
    Stack,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import selectStyles from "../../styles/components/select.module.css";
import { checkAdmin } from "../../utils/check-permissions";
import { useCreateTrackMutation } from "../../graphql/graphql";
import { withApollo } from "../../utils/with-apollo";

const today = new Date();

const validationSchema = yup.object().shape({
    ["trackId"]: yup.number().required().label("Track ID"),
    ["artist"]: yup.string().required().label("Artist"),
    ["title"]: yup.string().required().label("Title"),
    ["version"]: yup.string().label("Version").default(""),
    ["label"]: yup.string().label("Label").default(""),
    ["buyUrl"]: yup.string().label("Buy URL").default(""),
    ["month"]: yup.number().required().label("Release Month"),
    ["year"]: yup.number().required().label("Release Year"),
});

const CreateTrack = () => {
    const router = useRouter();
    checkAdmin();

    const [CreateTrack] = useCreateTrackMutation();
    const { register, errors, handleSubmit, formState } = useForm<ICreateTrack>(
        {
            resolver: yupResolver(validationSchema),
            mode: "onBlur",
            reValidateMode: "onSubmit",
        }
    );

    const onFormSubmit = async (values: ICreateTrack) => {
        const { errors } = await CreateTrack({
            variables: { input: values },
            update: (cache) => {
                cache.evict({ fieldName: "tracks:{}" });
            },
        });
        if (!errors) {
            console.log("Success!");
            router.push("/");
        } else {
            console.log(errors);
        }
    };

    return (
        <Layout>
            <Flex justifyContent="center" fontWeight="600">
                <Container maxW="48em" margin="10px 10px" overflow="hidden">
                    <Heading as="h1" size="lg" textAlign="center" mb={6}>
                        Add New Track
                    </Heading>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <Stack spacing={4}>
                            <Input
                                id="trackId"
                                name="trackId"
                                placeholder="Track ID"
                                autoComplete="off"
                                ref={register}
                            />
                            <Input
                                id="title"
                                name="title"
                                placeholder="Title"
                                autoComplete="off"
                                ref={register}
                                autoFocus
                            />
                            <Input
                                id="version"
                                name="version"
                                placeholder="Version"
                                autoComplete="off"
                                ref={register}
                            />
                            <Input
                                id="artist"
                                name="artist"
                                placeholder="Artist"
                                autoComplete="off"
                                ref={register}
                            />
                            <Input
                                id="label"
                                name="label"
                                placeholder="Label"
                                ref={register}
                            />
                            <Input
                                id="buyUrl"
                                name="buyUrl"
                                placeholder="Buy URL"
                                autoComplete="off"
                                ref={register}
                            />
                            <Select
                                id="month"
                                name="month"
                                placeholder="Release Month"
                                autoComplete="off"
                                defaultValue={today.getMonth() + 1}
                                ref={register}
                                color="white"
                                className={selectStyles.select}
                            >
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </Select>
                            <FormErrorMessage>
                                {errors.month && errors.month.message}
                            </FormErrorMessage>
                            <FormControl isInvalid={!!errors?.year}>
                                <Input
                                    id="year"
                                    name="year"
                                    placeholder="Release Year"
                                    defaultValue={today
                                        .getFullYear()
                                        .toString()}
                                    ref={register}
                                />
                                <FormErrorMessage>
                                    {errors.year && errors.year.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Button
                            width="100%"
                            mt={8}
                            colorScheme="blue"
                            isLoading={formState.isSubmitting}
                            type="submit"
                        >
                            SUBMIT
                        </Button>
                    </form>
                </Container>
            </Flex>
        </Layout>
    );
};

export default withApollo({ ssr: true })(CreateTrack);
