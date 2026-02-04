import { Router } from "express";

import { authenticate } from "@/utils/authenticate";
import { validate } from "@/utils/validate";

import { masterSkillController } from "../master-skill/master-skill.controller";
import { createTagSchema } from "../tag/tag.schema";
import { masterController } from "./master.controller";
import { createMasterSchema, updateMasterSchema } from "./master.schema";

export const masterRouter = Router();

masterRouter.get("/categories", authenticate, masterController.getServiceCategories);
masterRouter.get("/", authenticate, masterController.getByUserId);
masterRouter.post("/", authenticate, validate(createMasterSchema), masterController.create);
masterRouter.post("/skill", authenticate, validate(createTagSchema), masterSkillController.add);
masterRouter.put("/", authenticate, validate(updateMasterSchema), masterController.update);
masterRouter.delete("/", authenticate, masterController.delete);
