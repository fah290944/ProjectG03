package entity

import (
	"time"

	"gorm.io/gorm"
)

type Activity struct {
	gorm.Model
	Name      string
	Time      time.Time
	Overtimes []Overtime `gorm:"foreignKey:ActivityID"`
}
type Locationwork struct {
	gorm.Model
	Name      string
	Address   string
	Overtimes []Overtime `gorm:"foreignKey:LocationworkID"`
}
type Overtime struct {
	gorm.Model
	Num  int
	Time time.Time

	//DoctorID ทำหน้าที่เป็น FK
	DoctorID *uint
	Doctor   Doctor `gorm:"references:ID"`

	//ActivityID ทำหน้าที่เป็น FK
	ActivityID *uint
	Activity   Activity `gorm:"references:ID"`

	//LocationID ทำหน้าที่เป็น FK
	LocationworkID *uint
	Locationwork   Locationwork `gorm:"references:ID"`


}
