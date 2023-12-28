"use client";
import { useCreateDatasetModal } from "../datasets/create-dataset-modal";
import Button from "@/components/shared/button";
import Text from "@/components/shared/text";
import { Dataset, User } from "@prisma/client";
import { renderDataset } from "utils/datasets";

export default function DashboardMain({
  datasets,
  user,
}: {
  datasets?: Dataset[];
  user: User;
}) {
  const { CreateDatasetModal, setShowModal } = useCreateDatasetModal();

  return (
    <div className="my-4">
      <div className="mb-4">
        <CreateDatasetModal />
        <Button onClick={() => setShowModal(true)}>Create a dataset</Button>
      </div>
      {!datasets ||
        (datasets.length === 0 && (
          <div>
            <Text>You don&lsquo;t have any datasets.</Text>
          </div>
        ))}
      {datasets && datasets.length > 0 && (
        <div>
          <Text>You have {datasets.length} datasets.</Text>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {datasets.map((dataset) => renderDataset(user, dataset))}
          </div>
        </div>
      )}
    </div>
  );
}
