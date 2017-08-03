(defproject index-kata "0.1.0-SNAPSHOT"
  :description "index kata"
  :url "https://github.com/marcoemrich/index_kata"
  :dependencies [[org.clojure/clojure "1.9.0-alpha15"] ]
  :local-repo ".mvn-cache"
  :profiles {:dev {:plugins [[com.jakemccrary/lein-test-refresh "0.18.1"]
                             [test2junit "1.2.5"]]}})
