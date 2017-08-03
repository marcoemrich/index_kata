(ns index-kata.page-reference-test
  (:require [index-kata.page-reference :refer [page-reference-text]]
            [clojure.test :refer [is deftest testing]]))

(defn run-pass
  [refs]
  (doseq [ref refs]
    (page-reference-text (:ref ref) (:page ref))))

(defn run-expects
  [refs]
  (doseq [ref refs]
    (is (= (:result ref) (page-reference-text (:ref ref) (:page ref))))))

(deftest test-page-reference-text
  (testing "Return the correct link texts as page padded right by space"
    (let [example-refs [{:ref 1 :page 27 :result "27 "}
                        {:ref 2 :page 37 :result "37 "}]]
      (run-pass example-refs)
      (run-expects example-refs)))

  (comment (testing "Not repeat page numbers"
             (let [example-refs [{:ref 1 :page 27 :result "27 "}
                                 {:ref 2 :page 46 :result "46 "}
                                 {:ref 3 :page 46 :result ""}
                                 {:ref 4 :page 56 :result "56 "}]]
               (run-pass example-refs)
               (run-expects example-refs))))

  (comment (testing "Use page ranges"
             (let [example-refs [{:ref 1 :page 83 :result "83 "}
                                 {:ref 2 :page 87 :result "87-89 "}
                                 {:ref 3 :page 88 :result ""}
                                 {:ref 4 :page 89 :result ""}
                                 {:ref 5 :page 99 :result "99 "}]]
               (run-pass example-refs)
               (run-expects example-refs))))

  (comment (testing "Provides consistent results on a third pass")))
