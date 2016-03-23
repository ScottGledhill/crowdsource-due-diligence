class CreateResultAnalyses < ActiveRecord::Migration
  def change
    create_table :result_analyses do |t|

      t.timestamps null: false
    end
  end
end
