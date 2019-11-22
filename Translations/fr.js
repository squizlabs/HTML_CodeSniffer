_global.translation['fr'] = {

    //HTMLCSAuditor.js
    "auditor_name" : 'HTML_CodeSniffer par Squiz'
    ,"auditor_using_standard" : 'Utilisation de la norme'
    ,"auditor_standards" : 'Normes'
    ,"auditor_code_snippet" : 'Bout de code'
    ,"auditor_close" : 'Fermer'
    ,"auditor_select_types" : 'Sélectionner les types de questions à inclure dans le rapport'
    ,"auditor_home" : 'Accueil'
    ,"auditor_view_report" : 'Voir le rapport'
    ,"auditor_report" : 'Rapport'
    ,"auditor_back_to_report" : 'Retour au rapport'
    ,"auditor_previous_issue" : 'Problème précédent'
    ,"auditor_next_issue" : 'Prochain problème'
    ,"auditor_issue" : 'Problème'
    ,"auditor_of" : 'de'
    ,"auditor_errors" : 'Erreurs'
    ,"auditor_error" : 'Erreur'
    ,"auditor_warnings" : 'Attentions'
    ,"auditor_warning" : 'Attention'
    ,"auditor_notices" : 'Avis'
    ,"auditor_notice" : 'Avis'
    ,"auditor_toggle_display_of" : 'Basculer l\'affichage de'
    ,"auditor_messages" : 'messages'
    ,"auditor_unable_to_point" : 'Impossible de pointer vers l\'élément associé à ce problème.'
    ,"auditor_unable_to_point_entire" : 'Impossible d\'attirer l\'attention sur cette question, car elle concerne l\'ensemble du document.'
    ,"auditor_unable_to_point_removed" : 'Impossible de pointer vers cet élément car il a été supprimé du document depuis que le rapport a été généré.'
    ,"auditor_unable_to_point_outside" : 'Impossible de pointer vers cet élément parce qu\'il est situé à l\'extérieur de l\'élément de corps du document.'
    ,"auditor_unable_to_point_hidden" : 'Impossible de pointer vers cet élément parce qu\'il est caché de la vue ou n\'a pas de représentation visuelle.'
    ,"auditor_point_to_element" : 'Pointer vers l\'élément'
    ,"auditor_unsupported_browser" : 'La fonctionnalité d\'extrait de code n\'est pas prise en charge dans ce navigateur.'
    ,"auditor_page" : 'Page'
    ,"auditor_updated_to" : 'HTML_CodeSniffer a été mis à jour en version'
    ,"auditor_view_the_changelog" : 'Voir le journal des modifications'
    ,"auditor_success_criterion" : "Critère de réussite"
    ,"auditor_suggested_techniques" : "Techniques suggérées"
    ,"auditor_applies_entire_document" : "Ceci s'applique à l'ensemble du document"

    //1_1_1.js
    ,"1_1_1_H30.2" : 'L\'élément Img est le seul contenu du lien, mais il manque le texte alt. Le texte alternatif devrait décrire le but du lien.'
    ,"1_1_1_H67.1" : 'L\'élément Img avec du texte alt vide doit avoir un attribut de titre absent ou vide.'
    ,"1_1_1_H67.2" : 'L\'élément Img est marqué de sorte qu\'il est ignoré par la technologie d\'assistance.'
    ,"1_1_1_H37" : 'Élément Img auquel il manque un attribut alt. Utilisez l\'attribut alt pour spécifier une alternative de texte court.'
    ,"1_1_1_G94.Image" : 'Assurez-vous que le texte alt de l\'élément img sert aux mêmes fins et présente les mêmes informations que l\'image.'
    ,"1_1_1_H36" : 'Le bouton de soumission d\'image n\'a pas de texte alternatif. Spécifiez une alternative de texte qui décrit la fonction du bouton, en utilisant l\'attribut alt.'
    ,"1_1_1_G94.Button" : 'Assurez-vous que le texte alt du bouton de soumission d\'image identifie le but du bouton.'
    ,"1_1_1_H24" : 'Élément de zone dans une carte-image sans attribut alt. Chaque élément de zone doit avoir une alternative textuelle qui décrit la fonction de la zone de la carte image.'
    ,"1_1_1_H24.2" : 'Assurez-vous que l\'alternative textuelle de l\'élément de zone sert le même but que la partie de l\'image de la carte-image à laquelle il fait référence.'
    ,"1_1_1_G73,G74" : 'Si cette image ne peut être entièrement décrite dans un texte court, assurez-vous qu\'un texte long est également disponible, comme dans le corps du texte ou par le biais d\'un lien.'
    ,"1_1_1_H2.EG5" : 'L\'élément Img à l\'intérieur d\'un lien ne doit pas utiliser de texte alt qui duplique le contenu textuel du lien.'
    ,"1_1_1_H2.EG4" : 'L\'élément Img à l\'intérieur d\'un lien a du texte alt vide ou manquant lorsqu\'un lien à côté contient du texte de lien. Pensez à combiner les liens.'
    ,"1_1_1_H2.EG3" : 'L\'élément Img à l\'intérieur d\'un lien ne doit pas utiliser de texte alt qui duplique le contenu d\'un lien texte à côté.'
    ,"1_1_1_H53,ARIA6" : 'Les éléments d\'objet doivent contenir une alternative de texte après l\'épuisement de toutes les autres alternatives.'
    ,"1_1_1_G94,G92.Object,ARIA6" : 'Vérifiez que des textes courts (et, le cas échéant, les longs) sont disponibles pour les contenus non textuels qui servent le même but et présentent la même information.'
    ,"1_1_1_H35.3" : 'Les éléments de l\'applet doivent contenir une alternative textuelle dans le corps de l\'élément, pour les navigateurs qui ne supportent pas l\'élément applet.'
    ,"1_1_1_H35.2" : 'Les éléments de l\'applet doivent contenir un attribut alt, afin de fournir une alternative textuelle aux navigateurs supportant l\'élément mais incapables de charger l\'applet.'
    ,"1_1_1_G94,G92.Applet" : 'Vérifiez que des textes courts (et, le cas échéant, les longs) sont disponibles pour les contenus non textuels qui servent le même but et présentent la même information.'


    //1_2_1.js
    ,"1_2_1_G158" : 'Si cet objet incorporé ne contient que de l\'audio préenregistré et n\'est pas fourni comme alternative pour le contenu textuel, vérifiez qu\'une version texte alternative est disponible.'
    ,"1_2_1_G159,G166" : 'Si cet objet incorporé ne contient que de la vidéo préenregistrée et n\'est pas fourni comme alternative au contenu textuel, vérifiez qu\'une version texte alternative est disponible, ou qu\'une piste audio est fournie qui présente des informations équivalentes.'


    //1_2_1.js
    ,"1_2_2_G87,G93" : 'Si cet objet incorporé contient un support synchronisé préenregistré et n\'est pas fourni comme alternative pour le contenu textuel, vérifiez que les légendes sont fournies pour le contenu audio.'


    //1_2_3.js
    ,"1_2_3_G69,G78,G173,G8" : 'Si cet objet incorporé contient un support synchronisé préenregistré et n\'est pas fourni comme alternative au contenu textuel, vérifiez qu\'une description audio de sa vidéo et/ou une version textuelle alternative du contenu est fournie.'


    //1_2_4.js
    ,"1_2_4_G9,G87,G93" : 'Si cet objet incorporé contient des médias synchronisés, vérifiez que les légendes sont fournies pour le contenu audio en direct.'


    //1_2_5.js
    ,"1_2_5_G78,G173,G8" : 'Si cet objet incorporé contient un support synchronisé préenregistré, vérifiez qu\'une description audio est fournie pour son contenu vidéo.'


    //1_2_6.js
    ,"1_2_6_G54,G81" : 'Si cet objet incorporé contient un support synchronisé préenregistré, vérifiez qu\'une interprétation en langage des signes est fournie pour l\'audio.'


    //1_2_7.js
    ,"1_2_7_G8" : 'Si cet objet incorporé contient des médias synchronisés, et si les pauses dans l\'audio de premier plan ne suffisent pas pour permettre aux descriptions audio de transmettre le sens de la vidéo préenregistrée, vérifiez qu\'une description audio étendue est fournie, soit par le biais d\'un script ou d\'une autre version.'


    //1_2_8.js
    ,"1_2_8_G69,G159" : 'Si cet objet incorporé contient un média synchronisé pré-enregistré ou un contenu vidéo uniquement, vérifiez qu\'une version texte alternative du contenu est fournie.'


    //1_2_9.js
    ,"1_2_9_G150,G151,G157" : 'Si cet objet incorporé contient du contenu audio en direct, vérifiez qu\'une version texte alternative du contenu est fournie.'


    //1_3_1.js
    ,"1_3_1_F92,ARIA4" : 'Le rôle de cet élément est "présentation" mais contient des éléments enfants avec une signification sémantique.'
    ,"1_3_1_H44.NonExistent" : 'L\'attribut "for" de cette étiquette contient un identifiant qui n\'existe pas dans le document.'
    ,"1_3_1_H44.NonExistentFragment" : 'L\'attribut "for" de cette étiquette contient un ID qui n\'existe pas dans le fragment de document.'
    ,"1_3_1_H44.NotFormControl" : 'L\'attribut "for" de cette étiquette contient un ID pour un élément qui n\'est pas un contrôle de formulaire. Assurez-vous d\'avoir saisi l\'ID correct pour l\'élément prévu.'
    ,"1_3_1_H65" : 'Ce contrôle de formulaire a un attribut "title" qui est vide ou ne contient que des espaces. Il sera ignoré à des fins de test d\'étiquetage.'
    ,"1_3_1_ARIA6" : 'Ce contrôle de formulaire possède un attribut "aria-label" qui est vide ou ne contient que des espaces. Il sera ignoré à des fins de test d\'étiquetage.'
    //{{{id}} sera remplacé par l'ID de l'élément :
    ,"1_3_1_ARIA16,ARIA9" : 'Ce contrôle de formulaire contient un attribut aria-labelledby, mais il inclut un ID "{{id}}" qui n\'existe pas sur un élément. L\'attribut aria-labelledby sera ignoré à des fins de test d\'étiquetage.'

    ,"1_3_1_F68.Hidden" : 'Ce champ de formulaire caché est étiqueté d\'une manière ou d\'une autre. Il ne devrait pas être nécessaire d\'étiqueter un champ de formulaire caché.'
    ,"1_3_1_F68.HiddenAttr" : 'Ce champ de formulaire est destiné à être masqué (à l\'aide de l\'attribut "caché"), mais il est également étiqueté d\'une manière ou d\'une autre. Il ne devrait pas être nécessaire d\'étiqueter un champ de formulaire caché.'
    ,"1_3_1_F68" : 'Ce champ du formulaire doit être étiqueté d\'une manière ou d\'une autre. Utilisez l\'élément d\'étiquette (avec un attribut "for" ou enroulé autour du champ du formulaire), ou les attributs "title", "aria-label" ou "aria-labelledby" selon le cas.'

    ,"1_3_1_H49." : 'Le balisage de présentation utilisé est devenu obsolète dans HTML5.'
    ,"1_3_1_H49.AlignAttr" : 'Aligner les attributs.'
    ,"1_3_1_H49.Semantic" : 'Le balisage sémantique doit être utilisé pour marquer un texte accentué ou un texte spécial afin qu\'il puisse être déterminé par programmation.'
    ,"1_3_1_H49.AlignAttr.Semantic" : 'Le balisage sémantique doit être utilisé pour marquer un texte accentué ou un texte spécial afin qu\'il puisse être déterminé par programmation.'

    ,"1_3_1_H42" : 'Une balise d\'en-tête doit être utilisée si ce contenu est destiné à servir d\'en-tête.'

    ,"1_3_1_H63.3" : 'La cellule de table a un attribut de portée invalide. Les valeurs valides sont ligne, col, groupe de lignes, groupe de lignes ou groupe de colonnes.'
    ,"1_3_1_H63.2" : 'Les attributs Scope sur les éléments td qui servent de titres pour d\'autres éléments sont obsolètes dans HTML5. Utilisez un th élément à la place.'
    ,"1_3_1_H43.ScopeAmbiguous" : 'Les attributs de portée sur ces éléments sont ambigus dans un tableau à niveaux multiples d\'en-têtes. Utilisez plutôt l\'attribut headers sur les éléments td.'
    ,"1_3_1_H43.IncorrectAttr" : 'L\'attribut d\'en-tête incorrect sur cet élément td. Attendue "{{expected}}" mais trouvée "{{actual}}".'

    ,"1_3_1_H43.HeadersRequired" : 'La relation entre les éléments td et leurs éléments associés n\'est pas définie. Comme cette table a plusieurs niveaux de ces éléments, vous devez utiliser l\'attribut headers sur les éléments td.'
    ,"1_3_1_H43.MissingHeaderIds" : 'Tous les éléments de cette table ne contiennent pas un attribut id. Ces cellules devraient contenir des ids de sorte qu\'elles puissent être référencées par des éléments td attributs d\'en-têtes.'
    ,"1_3_1_H43.MissingHeadersAttrs" : 'Tous les éléments td de cette table ne contiennent pas un attribut d\'en-tête. Chaque attribut d\'en-tête devrait énumérer les ids de tous les éléments associés à cette cellule.'
    ,"1_3_1_H43,H63" : 'La relation entre les éléments td et leurs éléments associés n\'est pas définie. Utilisez soit l\'attribut scope sur ces éléments, soit l\'attribut headers sur les éléments td.'
    ,"1_3_1_H63.1" : 'Tous les éléments de ce tableau n\'ont pas tous un attribut de portée. Ces cellules doivent contenir un attribut scope pour identifier leur association avec les éléments td.'

    ,"1_3_1_H73.3.LayoutTable" : 'Ce tableau semble être utilisé pour la mise en page, mais contient un attribut résumé. Les tableaux de présentation ne doivent pas contenir d\'attributs sommaires ou, s\'ils sont fournis, doivent être vides.'
    ,"1_3_1_H39,H73.4" : 'Si ce tableau est un tableau de données et qu\'un attribut résumé et un élément de légende sont présents, le résumé ne doit pas dupliquer la légende.'
    ,"1_3_1_H73.3.Check" : 'Si ce tableau est un tableau de données, vérifiez que l\'attribut summary décrit l\'organisation du tableau ou explique comment utiliser le tableau.'
    ,"1_3_1_H73.3.NoSummary" : 'Si ce tableau est un tableau de données, envisagez d\'utiliser l\'attribut résumé de l\'élément de tableau pour donner une vue d\'ensemble de ce tableau.'
    ,"1_3_1_H39.3.LayoutTable" : 'Ce tableau semble être utilisé pour la mise en page, mais contient un élément de légende. Les tables de présentation ne doivent pas contenir de légendes.'
    ,"1_3_1_H39.3.Check" : 'Si ce tableau est un tableau de données, vérifiez que l\'élément de légende décrit correctement ce tableau.'
    ,"1_3_1_H39.3.NoCaption" : 'Si ce tableau est un tableau de données, envisagez d\'utiliser un élément de légende de l\'élément de tableau pour identifier ce tableau.'

    ,"1_3_1_H71.NoLegend" : 'Fieldset ne contient pas d\'élément de légende. Tous les champs doivent contenir un élément de légende décrivant la description du groupe de champs.'
    ,"1_3_1_H85.2" : 'Si cette liste de sélection contient des groupes d\'options connexes, ils doivent être regroupés avec le groupe optgroup.'

    ,"1_3_1_H71.SameName" : 'Si ces boutons radio ou cases à cocher nécessitent une description plus détaillée au niveau du groupe, ils doivent être contenus dans un élément de l\'ensemble des champs.'

    ,"1_3_1_H48.1" : 'Ce contenu semble simuler une liste non ordonnée à l\'aide de texte brut. Si c\'est le cas, marquer ce contenu avec un élément ul ajouterait une information de structure appropriée au document.'
    ,"1_3_1_H48.2" : 'Ce contenu semble simuler une liste ordonnée à l\'aide de texte brut. Si c\'est le cas, marquer ce contenu avec un élément ol ajouterait des informations de structure appropriées au document.'

    ,"1_3_1_G141_a" : 'La structure d\'en-tête n\'est pas imbriquée logiquement. Cet élément h{{{headingNum}} semble être l\'en-tête du document primaire, donc devrait être un élément h1.'
    ,"1_3_1_G141_b" : 'La structure d\'en-tête n\'est pas imbriquée logiquement. Cet élément h{{{headingNum}} devrait être un h{properHeadingNum}} pour être correctement imbriqué.'

    ,"1_3_1_H42.2" : 'Étiquette d\'en-tête trouvée sans contenu. Le texte qui n\'est pas destiné à servir d\'en-tête ne doit pas être marqué avec des balises d\'en-tête.'
    ,"1_3_1_H48" : 'Si cet élément contient une section de navigation, il est recommandé de le marquer comme une liste.'

    ,"1_3_1_LayoutTable" : 'Ce tableau semble être un tableau de présentation. S\'il s\'agit plutôt d\'un tableau de données, assurez-vous que les cellules d\'en-tête sont identifiées à l\'aide de ces éléments.'
    ,"1_3_1_DataTable" : 'Ce tableau semble être un tableau de données. S\'il s\'agit plutôt d\'un tableau de présentation, assurez-vous qu\'il n\'y a pas d\'éléments, ni de résumé ou de légende".'


    //1_3_2.js
    ,"1_3_2_G57" : 'Vérifiez que le contenu est ordonné dans un ordre significatif lorsqu\'il est linéarisé, par exemple lorsque les feuilles de style sont désactivées.'


    //1_3_3.js
    ,"1_3_3_G96" : 'Lorsque des instructions sont fournies pour comprendre le contenu, ne vous fiez pas uniquement aux caractéristiques sensorielles (telles que la forme, la taille ou l\'emplacement) pour décrire les objets.'


    //1_4_1.js
    ,"1_4_1_G14,G18" : 'Vérifier que toute information véhiculée par la couleur seule est également disponible sous forme de texte ou d\'autres repères visuels.'


    //1_4_2.js
    ,"1_4_2_F23" : 'Si cet élément contient de l\'audio qui joue automatiquement pendant plus de 3 secondes, vérifiez qu\'il est possible de mettre en pause, d\'arrêter ou de couper le son.'


    //1_4_3_F24.js
    ,"1_4_3_F24.BGColour" : 'Vérifiez que cet élément a une couleur d\'avant-plan héritée pour compléter la couleur ou l\'image d\'arrière-plan en ligne correspondante.'
    ,"1_4_3_F24.FGColour" : 'Vérifiez que cet élément a une couleur ou une image d\'arrière-plan héritée pour compléter la couleur d\'avant-plan correspondante.'


    //1_4_3.js
    ,"1_4_3_G18_or_G145.Abs" : 'Cet élément est absolument positionné et la couleur de fond ne peut pas être déterminée. Assurez-vous que le rapport de contraste entre le texte et toutes les parties couvertes de l\'arrière-plan est d\'au moins {{nécessaire}}:1.'
    ,"1_4_3_G18_or_G145.BgImage" : 'Le texte de cet élément est placé sur une image de fond. Assurez-vous que le rapport de contraste entre le texte et toutes les parties couvertes de l\'image est d\'au moins {{nécessaire}}:1.'
    ,"1_4_3_G18_or_G145.Alpha" : 'Le texte ou l\'arrière-plan de cet élément contient de la transparence. Assurez-vous que le rapport de contraste entre le texte et l\'arrière-plan est d\'au moins {{nécessaire}}:1.'
    ,"1_4_3_G18_or_G145.Fail" : 'Cet élément a un contraste insuffisant à ce niveau de conformité. On s\'attendait à un rapport de contraste d\'au moins {{required}}:1, mais le texte dans cet élément a un rapport de contraste de {{value}}:1.'
    ,"1_4_3_G18_or_G145.Fail.Recomendation" : 'Recommandation : '
    ,"1_4_3_G18_or_G145.Fail.Recomendation.Text" : 'changement Couleur du texte à {{value}}'
    ,"1_4_3_G18_or_G145.Fail.Recomendation.Background" : 'changement Fond à {{value}}'


    //1_4_4.js
    ,"1_4_4_G142" : 'Vérifiez que le texte peut être redimensionné sans technologie d\'assistance jusqu\'à 200 pour cent sans perte de contenu ou de fonctionnalité.'


    //1_4_5.js
    ,"1_4_5_G140,C22,C30.AALevel" : 'Si les technologies utilisées permettent d\'obtenir une présentation visuelle, vérifiez que le texte est utilisé pour transmettre des informations plutôt que des images de texte, sauf lorsque l\'image du texte est essentielle à l\'information véhiculée, ou peut être visuellement adaptée aux besoins de l\'utilisateur.'


    //1_4_6.js
    ,"1_4_6_G18_or_G17.Abs" : 'Cet élément est absolument positionné et la couleur de fond ne peut pas être déterminée. Assurez-vous que le rapport de contraste entre le texte et toutes les parties couvertes de l\'arrière-plan est d\'au moins {{nécessaire}}:1.'
    ,"1_4_6_G18_or_G17.BgImage" : 'Le texte de cet élément est placé sur une image de fond. Assurez-vous que le rapport de contraste entre le texte et toutes les parties couvertes de l\'image est d\'au moins {{nécessaire}}:1.'
    ,"1_4_6_G18_or_G17.Fail" : 'Cet élément a un contraste insuffisant à ce niveau de conformité. On s\'attendait à un rapport de contraste d\'au moins {{required}}:1, mais le texte dans cet élément a un rapport de contraste de {{value}}:1.'
    ,"1_4_6_G18_or_G17.Fail.Recomendation" : 'Recommandation : '
    ,"1_4_6_G18_or_G17.Fail.Recomendation.Text" : 'changement Couleur du texte à {{value}}'
    ,"1_4_6_G18_or_G17.Fail.Recomendation.Background" : 'changement Fond à {{value}}'


    //1_4_7.js
    ,"1_4_7_G56" : 'Pour le contenu audio préenregistré de cet élément qui est principalement de la parole (comme la narration), tout bruit de fond devrait être muet, ou être au moins 20 dB (ou environ 4 fois plus silencieux que le discours).'


    //1_4_8.js
    ,"1_4_8_G148,G156,G175" : 'Vérifiez qu\'il existe un mécanisme permettant à l\'utilisateur de sélectionner les couleurs d\'avant-plan et d\'arrière-plan pour les blocs de texte, soit par l\'intermédiaire de la page Web ou du navigateur.'
    ,"1_4_8_H87,C20" : 'Vérifiez qu\'il existe un mécanisme permettant de réduire la largeur d\'un bloc de texte à un maximum de 80 caractères (ou 40 en caractères chinois, japonais ou coréen).'
    ,"1_4_8_C19,G172,G169" : 'Vérifiez que les blocs de texte ne sont pas entièrement justifiés - c\'est-à-dire à gauche et à droite - ou qu\'il existe un mécanisme pour supprimer toute justification.'
    ,"1_4_8_G188,C21" : 'Vérifiez que l\'interligne dans les blocs de texte est d\'au moins 150% dans les paragraphes et que l\'interligne est d\'au moins 1,5 fois l\'interligne ou qu\'il existe un mécanisme pour y parvenir.'
    ,"1_4_8_H87,G146,C26" : 'Vérifiez que le texte peut être redimensionné sans technologie d\'assistance jusqu\'à 200 pour cent sans que l\'utilisateur ait besoin de faire défiler horizontalement sur une fenêtre plein écran.'


    //1_4_9.js
    ,"1_4_9_G140,C22,C30.NoException" : 'Vérifier que les images de texte ne sont utilisées qu\'à des fins de décoration pure ou lorsqu\'une présentation particulière du texte est essentielle à l\'information véhiculée.'


    //2_1_1.js
    ,"2_1_1_G90" : 'S\'assurer que la fonctionnalité fournie par un gestionnaire d\'événements pour cet élément est disponible par l\'intermédiaire du clavier.'
    ,"2_1_1_SCR20.DblClick" : 'Assurez-vous que la fonctionnalité fournie en double-cliquant sur cet élément est disponible par l\'intermédiaire du clavier.'
    ,"2_1_1_SCR20.MouseOver" : 'Assurez-vous que la fonctionnalité fournie par la souris sur cet élément est disponible par l\'intermédiaire du clavier, par exemple, en utilisant l\'événement focus.'
    ,"2_1_1_SCR20.MouseOut" : 'Assurez-vous que la fonctionnalité fournie par la souris hors de cet élément est disponible par le clavier ; par exemple, en utilisant l\'événement flou.'
    ,"2_1_1_SCR20.MouseMove" : 'Assurez-vous que la fonctionnalité fournie en déplaçant la souris sur cet élément est disponible par l\'intermédiaire du clavier.'
    ,"2_1_1_SCR20.MouseDown" : 'Assurez-vous que la fonctionnalité fournie par la souris sur cet élément est disponible par l\'intermédiaire du clavier, par exemple, en utilisant l\'événement keydown.'
    ,"2_1_1_SCR20.MouseUp" : 'Assurez-vous que la fonctionnalité fournie par la souris sur cet élément est disponible par l\'intermédiaire du clavier, par exemple, en utilisant l\'événement keyup.'


    //2_1_2.js
    ,"2_1_2_F10" : 'Vérifiez que cette applet ou plugin permet d\'éloigner le focus de lui-même lors de l\'utilisation du clavier.'


    //2_2_1.js
    ,"2_2_1_F40.2" : 'Meta refresh tag utilisé pour rediriger vers une autre page, avec une limite de temps qui n\'est pas nulle. Les utilisateurs ne peuvent pas contrôler cette limite de temps.'
    ,"2_2_1_F41.2" : 'Meta refresh tag utilisé pour rafraîchir la page courante. Les utilisateurs ne peuvent pas contrôler la limite de temps pour ce rafraîchissement.'


    //2_2_2.js
    ,"2_2_2_SCR33,SCR22,G187,G152,G186,G191" : 'Si une partie du contenu bouge, défile ou clignote pendant plus de 5 secondes, ou se met à jour automatiquement, vérifiez qu\'il existe un mécanisme permettant de mettre en pause, d\'arrêter ou de cacher le contenu.'
    ,"2_2_2_F4" : 'S\'assurer qu\'il existe un mécanisme permettant d\'arrêter cet élément clignotant en moins de cinq secondes.'
    ,"2_2_2_F47" : 'Les éléments clignotants ne peuvent pas satisfaire à l\'exigence selon laquelle les informations clignotantes peuvent être arrêtées en moins de cinq secondes.'


    //2_2_3.js
    ,"2_2_3_G5" : 'Vérifier que le chronométrage n\'est pas une partie essentielle de l\'événement ou de l\'activité présentée par le contenu, à l\'exception des médias synchronisés non interactifs et des événements en temps réel.'


    //2_2_4.js
    ,"2_2_4_SCR14" : 'Vérifier que toutes les interruptions (y compris les mises à jour du contenu) peuvent être reportées ou supprimées par l\'utilisateur, à l\'exception des interruptions impliquant une situation d\'urgence.'


    //2_2_5.js
    ,"2_2_5_G105,G181" : 'Si cette page Web fait partie d\'un ensemble de pages Web avec une limite de temps d\'inactivité, vérifiez qu\'un utilisateur authentifié peut poursuivre l\'activité sans perte de données après la ré-authentification.'


    //2_3_1.js
    ,"2_3_1_G19,G176" : 'Vérifier qu\'aucun composant du contenu ne clignote plus de trois fois au cours d\'une période d\'une seconde ou que la taille de la zone de clignotement est suffisamment petite.'


    //2_3_2.js
    ,"2_3_2_G19" : 'Vérifiez qu\'aucun composant du contenu ne clignote plus de trois fois au cours d\'une période d\'une seconde.'


    //2_4_1.js
    ,"2_4_1_H64.1" : 'L\'élément Iframe nécessite un attribut de titre non vide qui identifie la trame.'
    ,"2_4_1_H64.2" : 'Vérifiez que l\'attribut title de cet élément contient du texte qui identifie le cadre.'
    ,"2_4_1_G1,G123,G124,H69" : 'Veiller à ce que tous les éléments de navigation communs puissent être contournés ; par exemple, en utilisant des liens de saut, des éléments d\'en-tête ou des rôles de repère ARIA.'
    ,"2_4_1_G1,G123,G124.NoSuchID" : 'Ce lien pointe vers une ancre nommée "{{id}}" dans le document, mais aucune ancre n\'existe avec ce nom.'
    ,"2_4_1_G1,G123,G124.NoSuchIDFragment" : 'Ce lien pointe vers une ancre nommée "{{id}}" dans le document, mais aucune ancre n\'existe avec ce nom dans le fragment testé.'


    //2_4_2.js
    ,"2_4_2_H25.1.NoHeadEl" : 'Il n\'y a pas de section d\'en-tête dans laquelle placer un élément de titre descriptif.'
    ,"2_4_2_H25.1.NoTitleEl" : 'Un titre devrait être fourni pour le document, en utilisant un élément de titre non vide dans la section d\'en-tête.'
    ,"2_4_2_H25.1.EmptyTitle" : 'L\'élément de titre de la section d\'en-tête ne doit pas être vide.'
    ,"2_4_2_H25.2" : 'Vérifier que l\'élément de titre décrit le document.'


    //2_4_3.js
    ,"2_4_3_H4.2" : 'Si tabindex est utilisé, vérifiez que l\'ordre des onglets spécifié par les attributs de tabindex suit les relations dans le contenu.'


    //2_4_4.js
    ,"2_4_4_H77,H78,H79,H80,H81,H33" : 'Vérifiez que le texte du lien combiné avec le contexte du lien déterminé par le programme, ou son attribut de titre, identifie le but du lien.'
    ,"2_4_4_H77,H78,H79,H80,H81" : 'Vérifiez que le texte du lien combiné avec le contexte du lien déterminé par le programme identifie le but du lien.'


    //2_4_5.js
    ,"2_4_5_G125,G64,G63,G161,G126,G185" : 'Si cette page Web ne fait pas partie d\'un processus linéaire, vérifiez qu\'il existe plus d\'une façon de localiser cette page Web dans un ensemble de pages Web.'


    //2_4_6.js
    ,"2_4_6_G130,G131" : 'Vérifiez que les en-têtes et les étiquettes décrivent le sujet ou le but.'


    //2_4_7.js
    ,"2_4_7_G149,G165,G195,C15,SCR31" : 'Vérifiez qu\'il existe au moins un mode de fonctionnement dans lequel l\'indicateur de mise au point du clavier peut être placé visuellement sur les commandes de l\'interface utilisateur.'


    //2_4_8.js
    ,"2_4_8_H59.1" : 'Les éléments de lien ne peuvent être situés que dans la section d\'en-tête du document.'
    ,"2_4_8_H59.2a" : 'Il manque à l\'élément Link un attribut rel non vide identifiant le type de lien.'
    ,"2_4_8_H59.2b" : 'L\'élément Link manque un attribut href non vide pointant vers la ressource liée.'


    //2_4_9.js
    ,"2_4_9_H30" : 'Vérifiez que le texte du lien décrit l\'objet du lien.'


    //3_1_1.js
    ,"3_1_1_H57.2" : 'L\'élément html doit avoir un attribut lang ou xml:lang qui décrit la langue du document.'
    ,"3_1_1_H57.3.Lang" : 'La langue spécifiée dans l\'attribut lang de l\'élément de document ne semble pas être bien formée.'
    ,"3_1_1_H57.3.XmlLang" : 'La langue spécifiée dans l\'attribut xml:lang de l\'élément document ne semble pas être bien formée.'


    //3_1_2.js
    ,"3_1_2_H58" : 'Assurez-vous que tout changement de langue est marqué à l\'aide de l\'attribut lang et/ou xml:lang sur un élément, selon le cas.'
    ,"3_1_2_H58.1.Lang" : 'La langue spécifiée dans l\'attribut lang de cet élément ne semble pas être bien formée.'
    ,"3_1_2_H58.1.XmlLang" : 'Le langage spécifié dans l\'attribut xml:lang de cet élément ne semble pas être bien formé.'


    //3_1_3.js
    ,"3_1_3_H40,H54,H60,G62,G70" : 'Vérifier qu\'il existe un mécanisme permettant d\'identifier des définitions spécifiques de mots ou de phrases utilisés d\'une manière inhabituelle ou restreinte, y compris les expressions idiomatiques et le jargon.'


    //3_1_4.js
    ,"3_1_4_G102,G55,G62,H28,G97" : 'Vérifier qu\'il existe un mécanisme permettant d\'identifier la forme élargie ou la signification des abréviations.'


    //3_1_5.js
    ,"3_1_5_G86,G103,G79,G153,G160" : 'Lorsque le contenu exige une capacité de lecture plus avancée que le niveau de l\'enseignement secondaire inférieur, un contenu supplémentaire ou une version alternative devrait être fourni.'


    //3_1_6.js
    ,"3_1_6_H62.1.HTML5" : 'Ruby element does not contain an rt element containing prononciation information for its body text.'
    ,"3_1_6_H62.1.XHTML11" : 'Ruby element does not contain an rt element containing prononciation information for the text inside the rb element.'
    ,"3_1_6_H62.2" : 'Ruby element does not contain rp elements, which provide extra punctuation to browsers not supporting ruby text.'


    //3_2_1.js
    ,"3_2_1_G107" : 'Vérifier qu\'il n\'y a pas de changement de contexte lorsque ce champ de saisie reçoit le focus.'


    //3_2_2.js
    ,"3_2_2_H32.2" : 'Ce formulaire ne contient pas de bouton de soumission, ce qui crée des problèmes pour ceux qui ne peuvent pas soumettre le formulaire à l\'aide du clavier. Les boutons Submit sont des éléments INPUT avec l\'attribut de type "submit" ou "image", ou des éléments BUTTON avec le type "submit" ou omis/invalid.'


    //3_2_3.js
    ,"3_2_3_G61" : 'Vérifiez que les mécanismes de navigation qui sont répétés sur plusieurs pages Web se produisent dans le même ordre relatif chaque fois qu\'ils sont répétés, à moins qu\'un changement ne soit initié par l\'utilisateur.'


    //3_2_4.js
    ,"3_2_4_G197" : 'Vérifier que les composants qui ont la même fonctionnalité dans cette page Web sont identifiés de manière cohérente dans l\'ensemble des pages Web auxquelles ils appartiennent.'


    //3_2_5.js
    ,"3_2_5_H83.3" : 'Vérifiez que le texte du lien de ce lien contient des informations indiquant que le lien s\'ouvrira dans une nouvelle fenêtre.'


    //3_3_1.js
    ,"3_3_1_G83,G84,G85" : 'Si une erreur de saisie est automatiquement détectée dans ce formulaire, vérifiez que le ou les éléments erronés sont identifiés et que l\'erreur ou les erreurs sont décrites à l\'utilisateur sous forme de texte.'


    //3_3_2.js
    ,"3_3_2_G131,G89,G184,H90" : 'Vérifier que les étiquettes descriptives ou les instructions (y compris pour les champs obligatoires) sont fournies pour l\'entrée de l\'utilisateur dans ce formulaire.'


    //3_3_3.js
    ,"3_3_3_G177" : 'Vérifier que ce formulaire fournit les corrections suggérées en cas d\'erreurs dans les entrées des utilisateurs, à moins que cela ne compromette la sécurité ou l\'objectif du contenu.'


    //3_3_4.js
    ,"3_3_4_G98,G99,G155,G164,G168.LegalForms" : 'Si ce formulaire lie un utilisateur à un engagement financier ou juridique, modifie/supprime des données contrôlables par l\'utilisateur, ou soumet des réponses de test, assurez-vous que les soumissions sont réversibles, vérifiées pour les erreurs de saisie et/ou confirmées par l\'utilisateur.'


    //3_3_5.js
    ,"3_3_5_G71,G184,G193" : 'Vérifiez que l\'aide contextuelle est disponible pour ce formulaire, au niveau de la page Web et/ou du contrôle.'


    //3_3_6.js
    ,"3_3_6_G98,G99,G155,G164,G168.AllForms" : 'Vérifier que les soumissions à ce formulaire sont soit réversibles, soit vérifiées pour les erreurs de saisie, et/ou confirmées par l\'utilisateur.'


    //4_1_1.js
    ,"4_1_1_F77" : 'Dupliquer la valeur de l\'attribut id "{{id}}" trouvée sur la page web.'


    //4_1_2.js
    ,"4_1_2_H91.A.Empty" : 'L\'élément d\'ancrage trouvé avec un ID mais sans href ou texte de lien. Envisager de déplacer son ID vers un élément parent ou un élément voisin.'
    ,"4_1_2_H91.A.EmptyWithName" : 'L\'élément d\'ancrage trouvé avec un attribut de nom mais sans href ou texte de lien. Envisagez de déplacer l\'attribut de nom pour qu\'il devienne l\'ID d\'un parent ou d\'un élément voisin.'
    ,"4_1_2_H91.A.EmptyNoId" : 'Élément d\'ancrage trouvé sans contenu de lien et sans nom et/ou attribut ID.'
    ,"4_1_2_H91.A.NoHref" : 'Les éléments d\'ancrage ne doivent pas être utilisés pour définir des cibles de liens en page. Si vous n\'utilisez pas l\'ID à d\'autres fins (comme le CSS ou le script), envisagez de le déplacer vers un élément parent'
    ,"4_1_2_H91.A.Placeholder" : 'L\'élément d\'ancrage trouvé avec le contenu du lien, mais aucun attribut href, ID ou nom n\'a été fourni.'
    ,"4_1_2_H91.A.NoContent" : 'L\'élément d\'ancrage trouvé avec un attribut href valide, mais aucun contenu de lien n\'a été fourni.'


    ,"4_1_2_input_element" : 'élément d\'entrée'
    ,"4_1_2_element_content" : 'contenu de l\'élément'
    ,"4_1_2_element" : 'élément'
    ,"4_1_2_msg_pattern" : 'Ce {{msgNodeType}} n\'a pas de nom disponible pour une API d\'accessibilité. Les noms valides le sont : {{builtAttrs}}.'
    ,"4_1_2_msg_pattern_role_of_button" : 'Ce l\'élément a un rôle de "bouton" mais n\'a pas de nom disponible pour une API d\'accessibilité. Les noms valides le sont : {{builtAttrs}}.'
    ,"4_1_2_msg_pattern2" : 'Cette {{{msgNodeType}} n\'a pas de valeur disponible pour une API d\'accessibilité.'
    ,"4_1_2_msg_add_one" : 'Ajouter un en ajoutant du contenu à l\'élément.'
    ,"4_1_2_msg_pattern3" : 'Cette {{msgNodeType}} n\'a pas d\'option initialement sélectionnée. Selon votre version HTML, la valeur exposée à une API d\'accessibilité peut être indéfinie.'
    ,"4_1_2_value_exposed_using_attribute" : 'Une valeur est exposée à l\'aide de l\'attribut {{requiredValue}}.'
    ,"4_1_2_value_exposed_using_element" : 'Une valeur est exposée à l\'aide de l\'élément {{requiredValue}}.'

};
