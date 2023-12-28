import cx from "classnames";
import { nunitoSansHeavy } from "../fonts";
import Avatar from "@/components/shared/avatar";
import { getUser } from "@/lib/utils";
import { getDatasets } from "@/lib/prisma";
import { renderDataset } from "utils/datasets";

const notFound = <div>Dataset not found</div>;

export default async function Dataset({
  params: { username },
}: {
  params: { username: string; slug: string };
}) {
  const user = await getUser(username);

  if (!user) {
    return notFound;
  }

  const datasets = await getDatasets(user);

  return (
    <div className="flex w-full flex-col justify-between px-5">
      <div>
        <div>
          <div className="mb-8 flex space-x-2">
            {user.image && <Avatar src={user.image} width={48} height={48} />}
            <h1
              className={cx(
                `mb-1 text-5xl tracking-tight`,
                nunitoSansHeavy.className,
              )}
            >
              {user.slug}
            </h1>
          </div>
          <div>
            {datasets && datasets.length > 0 && (
              <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {datasets.map((dataset) => renderDataset(user, dataset))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
