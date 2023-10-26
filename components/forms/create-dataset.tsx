// @ts-ignore
import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/utils";
import Button from "@/components/shared/button";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import type { CreateDatasetResp } from "@/app/types";
import Input from "../shared/input";

export default function CreateDataset() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [slug, setSlug] = useState(name);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setNameAndSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
    setName(name);
  };

  const submit = async () => {
    setLoading(true);
    const data = {
      name,
      source,
      slug,
      userId: 1,
    };
    const res = await post("/api/datasets", data);

    const result: CreateDatasetResp = await res.json();

    console.log({ result });

    if (true) {
      router.refresh();
    }
    // } else {
    //   console.error("Failed to update username!", { result });
    //   setError("Failed to update username!");
    //   setLoading(false);
    // }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-4">
      {error && <Error message={error} />}
      <form action={submit} className="mb-2 flex flex-col space-y-4">
        <Input
          label="Name"
          id="name"
          placeholder="Enter a name"
          onChange={(e) => setNameAndSlug(e.target.value)}
        />
        <Input
          label="Slug"
          id="slug"
          value={slug}
          placeholder="This will get updated automatically"
          onChange={(e) => setSlug(e.target.value)}
        />
        <Input
          label="Source"
          id="source"
          placeholder="Enter a source (ex: https://github.com/mager/maps/tree/main/illinois)"
          onChange={(e) => setSource(e.target.value)}
        />

        <Button isSubmit disabled={loading}>
          Add
        </Button>
      </form>
    </div>
  );
}