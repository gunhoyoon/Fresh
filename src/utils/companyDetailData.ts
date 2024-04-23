export const CompanyDetailData = async ({
  queryKey,
}: {
  queryKey: readonly [string, string];
}) => {
  const [, id] = queryKey;
  const detailData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/company/${id}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!detailData.ok) throw new Error("회사 데이터 가져오기 실패");
  return await detailData.json();
};
