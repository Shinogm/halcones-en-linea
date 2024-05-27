export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          career: number
          created_at: string
          deadline: string
          desc: string | null
          education_plan: number
          group: number
          id: number
          is_open: boolean | null
          name: string
          professor: string
          semester: number
          subject: number
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          career: number
          created_at?: string
          deadline: string
          desc?: string | null
          education_plan: number
          group: number
          id?: number
          is_open?: boolean | null
          name: string
          professor: string
          semester: number
          subject: number
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: {
          career?: number
          created_at?: string
          deadline?: string
          desc?: string | null
          education_plan?: number
          group?: number
          id?: number
          is_open?: boolean | null
          name?: string
          professor?: string
          semester?: number
          subject?: number
          type?: Database["public"]["Enums"]["activity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_activities_career_fkey"
            columns: ["career"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_education_plan_fkey"
            columns: ["education_plan"]
            isOneToOne: false
            referencedRelation: "education_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_professor_fkey"
            columns: ["professor"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_semester_fkey"
            columns: ["semester"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          after_value: string | null
          before_value: string | null
          created_at: string
          id: number
          operation: string | null
          table_name: string | null
        }
        Insert: {
          after_value?: string | null
          before_value?: string | null
          created_at?: string
          id?: number
          operation?: string | null
          table_name?: string | null
        }
        Update: {
          after_value?: string | null
          before_value?: string | null
          created_at?: string
          id?: number
          operation?: string | null
          table_name?: string | null
        }
        Relationships: []
      }
      campus: {
        Row: {
          campus_key: string
          city: string
          colony: string
          created_at: string
          id: number
          name: string
          phone: string
          postal_code: string
          rfc: string
          state: string
          street: string
          street_number: string
        }
        Insert: {
          campus_key: string
          city: string
          colony: string
          created_at?: string
          id?: number
          name: string
          phone: string
          postal_code: string
          rfc: string
          state: string
          street: string
          street_number: string
        }
        Update: {
          campus_key?: string
          city?: string
          colony?: string
          created_at?: string
          id?: number
          name?: string
          phone?: string
          postal_code?: string
          rfc?: string
          state?: string
          street?: string
          street_number?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          campus: number
          coordinator: string | null
          created_at: string
          id: number
          name: string
          rvoe: string
          slug: string | null
        }
        Insert: {
          campus: number
          coordinator?: string | null
          created_at?: string
          id?: number
          name: string
          rvoe: string
          slug?: string | null
        }
        Update: {
          campus?: number
          coordinator?: string | null
          created_at?: string
          id?: number
          name?: string
          rvoe?: string
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "careers_coordinator_fkey"
            columns: ["coordinator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_carreras_campues_fkey"
            columns: ["campus"]
            isOneToOne: false
            referencedRelation: "campus"
            referencedColumns: ["id"]
          },
        ]
      }
      education_plans: {
        Row: {
          career: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          career: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          career?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_education_plans_career_fkey"
            columns: ["career"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          career: number
          created_at: string
          id: number
          name: string
        }
        Insert: {
          career: number
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          career?: number
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_groups_career_fkey"
            columns: ["career"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      "live-class": {
        Row: {
          career: number
          created_at: string
          group: number
          id: number
          plan: number
          semester: number
          subject: number
        }
        Insert: {
          career: number
          created_at?: string
          group: number
          id?: number
          plan: number
          semester: number
          subject: number
        }
        Update: {
          career?: number
          created_at?: string
          group?: number
          id?: number
          plan?: number
          semester?: number
          subject?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_live-class_career_fkey"
            columns: ["career"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_live-class_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_live-class_plan_fkey"
            columns: ["plan"]
            isOneToOne: false
            referencedRelation: "education_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_live-class_semester_fkey"
            columns: ["semester"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_live-class_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          accept_file: boolean
          activity: number
          created_at: string
          id: number
          question: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Insert: {
          accept_file: boolean
          activity: number
          created_at?: string
          id?: number
          question: string
          type: Database["public"]["Enums"]["question_type"]
        }
        Update: {
          accept_file?: boolean
          activity?: number
          created_at?: string
          id?: number
          question?: string
          type?: Database["public"]["Enums"]["question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_questions_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          created_at: string
          id: number
          is_correct: boolean
          option: string
          question: number
        }
        Insert: {
          created_at?: string
          id?: number
          is_correct: boolean
          option: string
          question: number
        }
        Update: {
          created_at?: string
          id?: number
          is_correct?: boolean
          option?: string
          question?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_multiple_options_questions_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      semester_subjects: {
        Row: {
          created_at: string
          id: number
          semester: number
          subject: number
        }
        Insert: {
          created_at?: string
          id?: number
          semester: number
          subject: number
        }
        Update: {
          created_at?: string
          id?: number
          semester?: number
          subject?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_semester_subjects_semester_fkey"
            columns: ["semester"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_semester_subjects_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      semesters: {
        Row: {
          created_at: string
          education_plan: number
          id: number
          number: number
        }
        Insert: {
          created_at?: string
          education_plan: number
          id?: number
          number: number
        }
        Update: {
          created_at?: string
          education_plan?: number
          id?: number
          number?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_semesters_education_plan_fkey"
            columns: ["education_plan"]
            isOneToOne: false
            referencedRelation: "education_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      student_activity_califications: {
        Row: {
          activity: number
          cal: number
          created_at: string
          id: number
          message: string
          student: string
        }
        Insert: {
          activity: number
          cal: number
          created_at?: string
          id?: number
          message: string
          student: string
        }
        Update: {
          activity?: number
          cal?: number
          created_at?: string
          id?: number
          message?: string
          student?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_activity_califications_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_activity_califications_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_config: {
        Row: {
          career: number
          created_at: string
          education_plan: number
          group: number
          id: number
          owner: string
          semester: number
        }
        Insert: {
          career: number
          created_at?: string
          education_plan: number
          group: number
          id?: number
          owner: string
          semester: number
        }
        Update: {
          career?: number
          created_at?: string
          education_plan?: number
          group?: number
          id?: number
          owner?: string
          semester?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_student_config_career_fkey"
            columns: ["career"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_student_config_education_plan_fkey"
            columns: ["education_plan"]
            isOneToOne: false
            referencedRelation: "education_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_student_config_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_student_config_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_student_config_semester_fkey"
            columns: ["semester"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
        ]
      }
      student_multiple_options: {
        Row: {
          activity: number
          created_at: string
          id: number
          question: number
          response: number
          student: string
        }
        Insert: {
          activity: number
          created_at?: string
          id?: number
          question: number
          response: number
          student: string
        }
        Update: {
          activity?: number
          created_at?: string
          id?: number
          question?: number
          response?: number
          student?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_multiple_options_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_multiple_options_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_multiple_options_response_fkey"
            columns: ["response"]
            isOneToOne: false
            referencedRelation: "responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_multiple_options_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_open_options: {
        Row: {
          activity: number
          created_at: string
          id: number
          question: number
          response: string
          student: string
        }
        Insert: {
          activity: number
          created_at?: string
          id?: number
          question: number
          response: string
          student: string
        }
        Update: {
          activity?: number
          created_at?: string
          id?: number
          question?: number
          response?: string
          student?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_open_options_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_open_options_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_open_options_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_work: {
        Row: {
          activity: number
          created_at: string
          id: number
          message: string | null
          student: string
        }
        Insert: {
          activity: number
          created_at?: string
          id?: number
          message?: string | null
          student: string
        }
        Update: {
          activity?: number
          created_at?: string
          id?: number
          message?: string | null
          student?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_student_work_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_student_work_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      teacher_config: {
        Row: {
          career: number
          created_at: string
          group: number
          id: number
          owner: string
          plan_edu: number
          semester: number
          subject: number
        }
        Insert: {
          career: number
          created_at?: string
          group: number
          id?: number
          owner: string
          plan_edu: number
          semester: number
          subject: number
        }
        Update: {
          career?: number
          created_at?: string
          group?: number
          id?: number
          owner?: string
          plan_edu?: number
          semester?: number
          subject?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_teacher_config_career_fkey"
            columns: ["career"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_teacher_config_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_teacher_config_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_teacher_config_plan_edu_fkey"
            columns: ["plan_edu"]
            isOneToOne: false
            referencedRelation: "education_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_teacher_config_semester_fkey"
            columns: ["semester"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_teacher_config_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_data: {
        Row: {
          birthdate: string | null
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          owner: string | null
          phone: string
          role: number
        }
        Insert: {
          birthdate?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          owner?: string | null
          phone: string
          role: number
        }
        Update: {
          birthdate?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          owner?: string | null
          phone?: string
          role?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_user_data_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_data_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      education_plan_update: {
        Args: {
          old_plan_id: number
          new_plan_name: string
          new_plan_semester_quantity: number
          semesters_to_delete: number[]
          semesters_to_update: number[]
          semesters_to_add: number[]
        }
        Returns: undefined
      }
      generate_slug: {
        Args: {
          title_text: string
        }
        Returns: string
      }
      get_role: {
        Args: {
          user_id: string
        }
        Returns: number
      }
    }
    Enums: {
      activity_type: "work" | "exam" | "trivia" | "questionary"
      question_type: "multiple_option" | "open"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
