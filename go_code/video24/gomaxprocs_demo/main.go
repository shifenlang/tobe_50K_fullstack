package main

import (
	"fmt"
	"runtime"
	"sync"
)

var wg sync.WaitGroup

func a() {
	for i := 1; i < 10; i++ {
		fmt.Println("A:", i)
	}
	wg.Done()
}

func b() {
	for i := 1; i < 10; i++ {
		fmt.Println("B:", i)
	}
	wg.Done()
}

func main() {
	runtime.GOMAXPROCS(6)
	//go routine的数目必须保持一致 不能多 也不能少
	wg.Add(2)
	go a()
	go b()
	wg.Wait()
}
