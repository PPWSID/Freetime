package repository

type TestRepository interface {
	TestConnectDB() (any, error)
}
