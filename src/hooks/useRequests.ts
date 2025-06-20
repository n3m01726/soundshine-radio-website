
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SongRequest, CreateSongRequest } from "@/types/requests";
import { requestService } from "@/services/requestService";
import { toast } from "sonner";

export const useRequests = () => {
  const queryClient = useQueryClient();

  // Fetch recent requests
  const { data: recentRequests = [], isLoading, error } = useQuery({
    queryKey: ['recent-requests'],
    queryFn: () => requestService.getRecentRequests(20),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Submit request mutation
  const submitRequestMutation = useMutation({
    mutationFn: (request: CreateSongRequest) => requestService.submitRequest(request),
    onSuccess: (data) => {
      if (data) {
        toast.success("Votre request a été soumise avec succès!");
        queryClient.invalidateQueries({ queryKey: ['recent-requests'] });
      } else {
        toast.error("Erreur lors de la soumission de votre request");
      }
    },
    onError: (error) => {
      console.error('Request submission error:', error);
      toast.error("Erreur lors de la soumission de votre request");
    }
  });

  return {
    recentRequests,
    isLoading,
    error,
    submitRequest: submitRequestMutation.mutate,
    isSubmitting: submitRequestMutation.isPending
  };
};
