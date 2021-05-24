import models from '../models'

const { company } = models

export async function verifyCompanyId(req, res, next) {
  const { companyId } = req.params;
  const currentCompanyId = req.current.companyId;

  if (parseInt(companyId, 10) !== parseInt(currentCompanyId, 10)) {
    return res.sendStatus(403);
  }

  const dbCompany = await company.findByPk(companyId);

  if (!dbCompany) {
    return res.sendStatus(404, { message: 'Company not found.' })
  }

  req.company = dbCompany;
  next();
}
