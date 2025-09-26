package dto

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type QueryParser struct {
}

type QuerySearch struct {
	Search *string `query:"search"`
}

type QueryPage struct {
	Page  int `query:"page"`
	Limit int `query:"limit" bson:"limit"`
	Skip  int `query:"skip" bson:"skip"`
}

type CommentReq struct {
	ID       primitive.ObjectID `json:"id" bson:"_id"`
	Message  string             `json:"message" bson:"message" validate:"required"`
	CreateAt time.Time          `json:"create_at" bson:"create_at"`
}
