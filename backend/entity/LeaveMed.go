package entity

import (
	"time"

	"gorm.io/gorm"
)

type Type struct {
	gorm.Model
	Tleave string
	// 1  type เป็น Leave ได้หลายครั้ง
	Leave []Leave `gorm:"foreignKey:TypeID"`
}

type Evidence struct {
	gorm.Model
	Etype string
	// 1 evidence เป็น Leave ได้หลายครั้ง
	Leave []Leave `gorm:"foreignKey:EvidenceID"`
}

type Leave struct {
	gorm.Model
	Reason string
	Fdate  time.Time
	Ldate  time.Time
	Cdate  int
	// DoctorID ทำหน้าที่เป็น FK
	DoctorID *uint
	Doctor   Doctor `gorm:"references:ID"`

	// TypeID ทำหน้าที่เป็น FK
	TypeID *uint
	Type   Type `gorm:"references:ID"`

	// EvidenceID ทำหน้าที่เป็น FK
	EvidenceID *uint
	Evidence   Evidence `gorm:"references:ID"`
}
