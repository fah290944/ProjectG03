package entity

import (
	"time"

	"gorm.io/gorm"
)

type MedActivity struct {
	gorm.Model
	Name string

	Schedule []Schedule `gorm:"foreignKey:MedActivityID"`
}

type Location struct {
	gorm.Model //ฟังก์ชันสำเร็จ
	Name       string
	// Address string

	Schedule []Schedule `gorm:"foreignKey:LocationID"`
}

type Schedule struct {
	gorm.Model
	Time time.Time

	DoctorID *uint  //อ้างอิง ID
	Doctor   Doctor `gorm:"references:ID"` //อ้างอิงอะไรก็ได้ //gorm ไม่จำเป็น ยกเว้นจะอ้าง

	LocationID *uint    //อ้างอิง ID
	Location   Location `gorm:"references:ID"` //หน้าเรียกตัวแปร หลังคือ type

	MedActivityID *uint
	MedActivity   MedActivity `gorm:"references:ID"`


}
