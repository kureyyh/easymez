import mongoose from "mongoose";

interface OrganisationAttrs {
  organisationId: string;
}

export interface OrganisationDoc extends mongoose.Document {
  organisationId: string;
}

interface OrganisationModel extends mongoose.Model<OrganisationDoc> {
  build(attrs: OrganisationAttrs): OrganisationDoc;
}

const OrganisationSchema = new mongoose.Schema(
  {
    organisationId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

OrganisationSchema.statics.build = (attrs: OrganisationAttrs) => {
  return new Organisation(attrs);
};

const Organisation = mongoose.model<OrganisationDoc, OrganisationModel>(
  "Organisation",
  OrganisationSchema
);

export { Organisation, OrganisationSchema };
