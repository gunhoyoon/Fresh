export const initCompanyData = async () => {
  const companyRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/initCompany`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  if (!companyRes.ok) throw new Error("첫 번째 요청 실패");

  return companyRes.json();
};
